import songService from "./song.service.js";
import lyricService from "./lyric.service.js";
import NotFoundError from "../errors/not-found.error.js";
import { parseLrc } from "../utils/lrc-parser.js";
import { serializeLrc } from "../utils/lrc-serializer.js";
import transformProvider from "./transform-provider.service.js";
import transformProfiles from "../constants/transform-profile.js";

class TransformService {

  async applyRomaji(lines) {
    for (const line of lines) {
      if (!line.original) {
        continue;
      }

      line.romaji = await transformProvider.romaji(
        line.original
      );
    }

    return lines;
  }

  async applyTranslation(lines) {

    const originals = lines.map(
      line => line.original
    );

    const translations =
      await transformProvider.translate(
        originals
      );

    for (let i = 0; i < lines.length; i++) {
      lines[i].translation =
        translations[i];
    }

    return lines;
  }

  buildPipeline(options) {
    const config =
      transformProfiles[
        options.profile
      ];

    // if (!config) {
    //   throw new Error(
    //     `Unknown profile: ${options.profile}`
    //   );
    // }

    const pipeline = [];

    if (config.romaji) {
      pipeline.push(
        this.applyRomaji.bind(this)
      );
    }

    if (config.translate) {
      pipeline.push(
        this.applyTranslation.bind(this)
      );
    }

    return pipeline;
  }

  async transform(songId, options) {
    const song = songService.get(songId);

    if (!song) {
      throw new NotFoundError(
        "Song not found"
      );
    }

    const lyrics =
      await lyricService.load(song);

    if (!lyrics) {
      throw new NotFoundError(
        "Lyrics not found"
      );
    }

    let result =
      parseLrc(lyrics);

    const pipeline =
      this.buildPipeline(options);

    for (const step of pipeline) {
      result = await step(result);
    }

    return {
      lyrics: serializeLrc(
        result,
        options.profile
      )
    };
  }

}

export default new TransformService();