import { readMetadata } from "../src/utils/metadata.js";

const metadata = await readMetadata("/data-new/music/一里ぼっちCV_森下千咲_ね_いっしょにかえろ.flac");

console.log(metadata);
