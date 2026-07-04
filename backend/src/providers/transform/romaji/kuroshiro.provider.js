import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import KuroshiroModule from "kuroshiro";

const Kuroshiro = KuroshiroModule.default;

class KuroshiroProvider {

  #kuroshiro = new Kuroshiro();

  #ready = false;

  async initialize() {
    if (this.#ready) {
      return;
    }
    await this.#kuroshiro.init(
      new KuromojiAnalyzer()
    );
    this.#ready = true;
  }

  async convert(text) {
    await this.initialize();

    return await this.#kuroshiro.convert(
      text,
      {
        to: "romaji",
        mode: "spaced"
      }
    );
  }

}

export default new KuroshiroProvider();