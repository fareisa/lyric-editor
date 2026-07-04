import songService from "./song.service.js";
import lyricService from "./lyric.service.js";

import kuroshiroProvider from "../providers/transform/romaji/kuroshiro.provider.js";

import NotFoundError from "../errors/not-found.error.js";

import { parseLrc } from "../utils/lrc-parser.js";
import { serializeLrc } from "../utils/lrc-serializer.js";

class TransformService {

  async applyRomaji(lines) {
    for (const line of lines) {
      if (!line.original) continue;

      line.romaji = await kuroshiroProvider.convert(
        line.original
      );
    }

    return lines;
  }

  async transform(songId, options) {
    const song = songService.get(songId);

    if (!song) {
      throw new NotFoundError("Song not found");
    }

    const lyrics = await lyricService.load(song);

    if (!lyrics) {
      throw new NotFoundError("Lyrics not found");
    }

    let result = parseLrc(lyrics);

    if (options.romaji) {
      result = await this.applyRomaji(result);
    }

    return {
      lyrics: serializeLrc(
        result,
        options.output ?? ["original"]
      )
    };
  }

}

export default new TransformService();