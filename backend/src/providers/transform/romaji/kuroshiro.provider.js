import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import KuroshiroModule from "kuroshiro";

const Kuroshiro = KuroshiroModule.default;

class KuroshiroProvider {

  #kuroshiro = new Kuroshiro();

  #initialized = false;

  async initialize() {
    if (this.#initialized) {
      return;
    }
    await this.#kuroshiro.init(
      new KuromojiAnalyzer()
    );
    this.#initialized = true;
  }

  async convert(text) {
    await this.initialize();
    return this.#kuroshiro.convert(text, {
      to: "romaji",
      mode: "spaced"
    });
  }

}

export default new KuroshiroProvider();