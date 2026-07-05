import { idParamSchema } from "./common.schema.js";

export const transformLyricsSchema = {
  schema: {
    params: idParamSchema,

    body: {
      type: "object",

      properties: {
        romaji: {
          type: "boolean",
          default: false
        },

        translate: {
          type: "boolean",
          default: false
        },

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

          default: "original"
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