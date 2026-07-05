import kuroshiroProvider from "../providers/transform/romaji/kuroshiro.provider.js";
import googleProvider from "../providers/transform/translate/google.provider.js";

class TransformProviderService {

  async romaji(text) {
    return kuroshiroProvider.convert(text);
  }

  async translate(texts, target = "en") {
    return googleProvider.translateBatch(
      texts,
      target
    );
  }

}

export default new TransformProviderService();