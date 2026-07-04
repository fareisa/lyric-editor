import fs from "node:fs/promises";

class LyricService {
  async load(song) {
    try {
      return await fs.readFile(
        song.lyricPath,
        "utf8"
      );
    } catch {
      return null;
    }
  }
}

export default new LyricService();