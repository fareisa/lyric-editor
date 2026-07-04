import fs from "node:fs/promises";
import path from "node:path";

import {SUPPORTED_AUDIO_FORMATS} from "../constants/audio.js";

export async function scanDirectory(directory) {
  const files = [];
  await walk(directory, files);
  return files;
}

async function walk(directory, files) {
  const entries = await fs.readdir(directory, {
    withFileTypes: true
  });

  for (const entry of entries) {
    const fullPath = path.join(
      directory, entry.name
    );

    if (entry.isDirectory()) {
      await walk(fullPath, files);
      continue;
    }

    const extension =
      path.extname(entry.name)
        .toLowerCase();

    if (!SUPPORTED_AUDIO_FORMATS.has(extension)) {
      continue;
    }

    files.push({
      fullPath,
      filename: entry.name,
      basename:
        path.basename(
          entry.name,
          extension
        ),
      extension 
    });
  }
}
