import { scanDirectory } from "../src/utils/scanner.js";

const songs = await scanDirectory("/data-new/music");

console.log('found ${songs.length} songs');
console.table(songs.slice(0, 10));


