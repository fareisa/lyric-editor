import fs from "node:fs/promises";
import path from "node:path";

const SUPPORTED_FORMATS = new Set([
  ".mp3",
  ".flac",
  ".m4a",
  ".ogg",
  ".wav"
]);

export async function scanDirectory(directory) {
  const songs = [];

  await walk(directory, songs);

  return songs;
}

async function walk(directory, songs) {
  const entries = await fs.readdir(directory, {
    withFileTypes: true
  });

  for (const entry of entries) {

    const fullPath = path.join(
      directory,
      entry.name
    );

    if (entry.isDirectory()) {

      await walk(fullPath, songs);

      continue;
    }

    const extension =
      path.extname(entry.name)
        .toLowerCase();

    if (!SUPPORTED_FORMATS.has(extension)) {
      continue;
    }

    songs.push({
      fullPath,
      extension
    });
  }
}
