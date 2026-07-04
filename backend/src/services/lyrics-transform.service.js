import songService from "./song.service.js";
import lyricService from "./lyric.service.js";

import kuroshiroProvider
from "../providers/transform/romaji/kuroshiro.provider.js";

import NotFoundError
from "../errors/not-found.error.js";

class TransformService {

  async transform(songId, options) {

    const song =
      songService.get(songId);
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

    if (options.romaji) {
      return {
        lyrics:
        await kuroshiroProvider.convert(
          lyrics
        )
      };
    }

    return {
      lyrics
    };

  }

}

export default new TransformService();