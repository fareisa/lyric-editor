import googleProvider from "../src/providers/transform/translate/google.provider.js";

const lyrics = [
  "ね、いっしょにかえろ。",
  "ありがとう。",
  "夢を追いかけよう。"
];

const translated =
  await googleProvider.translateBatch(
    lyrics
  );

console.log(translated);