import logger from "../logger/logger.js";

import kuroshiroProvider from "../providers/transform/romaji/kuroshiro.provider.js";
import googleProvider from "../providers/transform/translate/google.provider.js";

class TransformProviderService {

  async romaji(text) {

    logger.debug(
      "Converting text to romaji"
    );

    try {

      const result =
        await kuroshiroProvider.convert(
          text
        );

      return result;

    } catch (err) {

      logger.error(
        err,
        "Romaji provider failed"
      );

      throw err;

    }

  }

  async translate(
    texts,
    target = "en"
  ) {

    logger.debug(
      {
        provider: "google",
        lines: texts.length,
        target
      },
      "Translating lyrics"
    );

    try {

      const result =
        await googleProvider.translateBatch(
          texts,
          target
        );

      logger.debug(
        {
          provider: "google",
          lines: result.length
        },
        "Translation completed"
      );

      return result;

    } catch (err) {

      logger.error(
        {
          err,
          provider: "google",
          target
        },
        "Translation provider failed"
      );

      throw err;

    }

  }

}

export default new TransformProviderService();