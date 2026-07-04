import { createLyricLine }
from "../models/lyric.model.js";

export function parseLrc(text) {

  const result = [];

  const lines =
    text.split("\n");

  for (const line of lines) {
      const match =
          line.match(
            /^\[(.*?)\](.*)$/
          );
      if (!match)
      continue;
      
      const lyric = match[2].trim();

      const [original, translation] =
        lyric.split("_BREAK_");

      result.push(
        createLyricLine({
          timestamp: match[1],
          original: original?.trim() ?? "",
          translation: translation?.trim() ?? null
        })
      ); 
    }
    return result;
}