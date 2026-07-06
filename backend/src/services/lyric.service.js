import fs from "node:fs/promises";
import logger from "../logger/logger.js";

class LyricService {

  async load(song) {

    logger.debug(
      {
        songId: song.id,
        path: song.lyricPath
      },
      "Loading lyrics"
    );

    try {

      const lyrics =
        await fs.readFile(
          song.lyricPath,
          "utf8"
        );

      logger.debug(
        {
          songId: song.id
        },
        "Lyrics loaded"
      );

      return lyrics;

    } catch (err) {

      if (err.code === "ENOENT") {

        logger.debug(
          {
            songId: song.id
          },
          "Lyrics file does not exist"
        );

        return null;

      }

      logger.error(
        {
          err,
          songId: song.id
        },
        "Failed to load lyrics"
      );

      throw err;

    }

  }

  async save(song, lyrics) {

    logger.info(
      {
        songId: song.id,
        path: song.lyricPath
      },
      "Saving lyrics"
    );

    try {

      await fs.writeFile(
        song.lyricPath,
        lyrics,
        "utf8"
      );

      logger.info(
        {
          songId: song.id
        },
        "Lyrics saved"
      );

    } catch (err) {

      logger.error(
        {
          err,
          songId: song.id
        },
        "Failed to save lyrics"
      );

      throw err;

    }

  }

}

export default new LyricService();