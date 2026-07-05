import { idParamSchema } from "./common.schema.js";

export const transformLyricsSchema = {
  schema: {
    params: idParamSchema,

    body: {
      type: "object",

      properties: {
        profile: {
          type: "string",

          enum: [
            "original-romaji",
            "original-translation",
            "romaji-translation",
            "all",
            "original-romaji-legacy",
            "original-translation-legacy",
            "romaji-translation-legacy"
          ],

          default: "original-romaji"
        },

        lyrics: {
          type: "string"
        }
      }
    },

    response: {
      200: {
        type: "object",

        properties: {
          lyrics: {
            type: "string"
          }
        }
      }
    }
  }
};