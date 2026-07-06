import axios from "axios";

class GoogleProvider {
  #cache = new Map();

  async translate(text, target) {
    if (!text) {
      return "";
    }

    const key = `${target}:${text}`;

    if (this.#cache.has(key)) {
      return this.#cache.get(key);
    }

    const { data } = await axios.get(
      "https://clients5.google.com/translate_a/t",
      {
        params: {
          client: "dict-chrome-ex",
          sl: "auto",
          tl: target,
          q: text
        },
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      }
    );

    const translated =
      data?.[0]?.[0] ?? text;

    this.#cache.set(key, translated);

    return translated;
  }

  async translateBatch(texts, target) {
    const result = [];

    for (const text of texts) {
      result.push(
        await this.translate(text, target)
      );
    }

    return result;
  }
}

export default new GoogleProvider();