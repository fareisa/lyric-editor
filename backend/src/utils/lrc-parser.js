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
      result.push(
        createLyricLine({          
          time: match[1],
          original:
            match[2].trim()
          })
      );
    }
    return result;
}