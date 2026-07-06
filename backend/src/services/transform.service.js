import songService from "./song.service.js";
import lyricService from "./lyric.service.js";
import logger from "../logger/logger.js";

import NotFoundError from "../errors/not-found.error.js";

import { parseLrc } from "../utils/lrc-parser.js";
import { serializeLrc } from "../utils/lrc-serializer.js";

import transformProvider from "./transform-provider.service.js";

import transformProfiles from "../constants/transform-profile.js";

class TransformService {

  async applyRomaji(lines) {

    logger.debug(
      {
        lines: lines.length
      },
      "Applying romaji"
    );

    for (const line of lines) {

      if (!line.original) {
        continue;
      }

      line.romaji =
        await transformProvider.romaji(
          line.original
        );

    }

    return lines;

  }

  async applyTranslation(
    lines,
    target = "en"
  ) {

    logger.debug(
      {
        lines: lines.length,
        target
      },
      "Applying translation"
    );

    const originals = lines.map(
      line => line.original
    );

    const translations =
      await transformProvider.translate(
        originals,
        target
      );

    for (let i = 0; i < lines.length; i++) {

      lines[i].translation =
        translations[i];

    }

    return lines;

  }

  buildPipeline(
    profile,
    target = "en"
  ) {

    logger.debug(
      {
        profile,
        target
      },
      "Building transform pipeline"
    );

    const config =
      transformProfiles[profile];

    if (!config) {

      logger.error(
        {
          profile
        },
        "Unknown transform profile"
      );

      throw new Error(
        `Unknown profile: ${profile}`
      );

    }

    const pipeline = [];

    if (config.romaji) {

      pipeline.push(
        this.applyRomaji.bind(this)
      );

    }

    if (config.translate) {

      pipeline.push(
        lines =>
          this.applyTranslation(
            lines,
            target
          )
      );

    }

    return pipeline;

  }

  async loadLyrics(song, options) {

    if (options.lyrics) {

      logger.debug(
        {
          songId: song.id
        },
        "Using supplied lyrics"
      );

      return options.lyrics;

    }

    logger.debug(
      {
        songId: song.id
      },
      "Loading local lyrics"
    );

    const lyrics =
      await lyricService.load(song);

    if (!lyrics) {

      logger.warn(
        {
          songId: song.id
        },
        "Lyrics not found"
      );

      throw new NotFoundError(
        "Lyrics not found"
      );

    }

    return lyrics;

  }

  async transform(songId, options) {

    const start = Date.now();

    logger.info(
      {
        songId,
        profile: options.profile,
        target: options.target
      },
      "Transform started"
    );

    try {

      const song =
        songService.get(songId);

      if (!song) {

        logger.warn(
          {
            songId
          },
          "Song not found"
        );

        throw new NotFoundError(
          "Song not found"
        );

      }

      const lyrics =
        await this.loadLyrics(
          song,
          options
        );

      let result =
        parseLrc(lyrics);

      const pipeline =
        this.buildPipeline(
          options.profile,
          options.target ?? "en"
        );

      for (const step of pipeline) {

        result =
          await step(result);

      }

      logger.info(
        {
          songId,
          profile: options.profile,
          target: options.target,
          lines: result.length,
          duration: Date.now() - start
        },
        "Transform completed"
      );

      return {
        lyrics: serializeLrc(
          result,
          options.profile
        )
      };

    } catch (err) {

      logger.error(
        err,
        "Transform failed"
      );

      throw err;

    }

  }

}

export default new TransformService();