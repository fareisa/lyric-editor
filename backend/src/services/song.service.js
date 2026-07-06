import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import config from "../config/env.js";
import logger from "../logger/logger.js";

import {
	scanDirectory
} 
from "../utils/scanner.js";

import {
  readMetadata
} 
from "../utils/metadata.js";

function createSongId(fullPath) {
  const relative = path.relative(
    config.musicDir,
    fullPath
  );

  return createHash("sha1")
    .update(relative)
    .digest("hex");
}

class SongService {

  #songs = new Map();
  #cache = [];

  async refresh() {

    const start = Date.now();

    logger.info(
      {
        path: config.musicDir
      },
      "Refreshing music library"
    );

    this.#songs.clear();
    this.#cache = [];

    try {

      const files =
        await scanDirectory(
          config.musicDir
        );

      for (const file of files) {
        const metadata =
          await readMetadata(
            file.fullPath
          );

        const id =
          createSongId(
            file.fullPath
          );

        const lyricPath =
          path.join(
            path.dirname(file.fullPath),
            `${file.basename}.lrc`
          );

        const hasLyrics =
          fs.existsSync(
            lyricPath
          );

        this.#songs.set(id, {
          id,
          fullPath: file.fullPath,
          lyricPath,
          title:
            metadata.title ??
            file.basename,
          artist:
            metadata.artist ??
            "Unknown Artist",
          album:
            metadata.album ??
            "Unknown Album",
          duration:
            metadata.duration,
          hasLyrics
        });

        this.#cache.push({
          id,
          title:
            metadata.title ??
            file.basename,
          artist:
            metadata.artist ??
            "Unknown Artist",
          album:
            metadata.album ??
            "Unknown Album",
          duration:
            metadata.duration,
          hasLyrics
        });

      }

      logger.info(
        {
          songs: this.#cache.length,
          duration: Date.now() - start
        },
        "Music library loaded"
      );

      return this.#cache.length;

    } catch (err) {

      logger.error(
        err,
        "Failed to refresh music library"
      );

      throw err;

    }

  }

  list() {
    return this.#cache;
  }

  get(id) {
    return this.#songs.get(id);
  }
}

export default new SongService();