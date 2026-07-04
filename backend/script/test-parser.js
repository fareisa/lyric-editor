import fs from "node:fs/promises";

import { parseLrc } from "../src/utils/lrc-parser.js";
import { serializeLrc } from "../src/utils/lrc-serializer.js";

const lyrics = await fs.readFile(
  "/data-new/music/01 - Nao Toyama - Aruite Iko!.lrc",
  "utf8"
);

const parsed = parseLrc(lyrics);

console.log(parsed);

console.log(
  serializeLrc(parsed, ["original"]),
  serializeLrc(parsed, ["translation"]),
  serializeLrc(parsed, ["original", "translation"])
);

