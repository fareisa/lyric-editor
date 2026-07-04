import kuroshiroProvider from "../src/providers/transform/romaji/kuroshiro.provider.js";

console.log(
    await kuroshiroProvider.convert(
        "ね、いっしょにかえろ。"
    )
);