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

    if (!SUPPORTED_FORMATS.has(extension)) {
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
