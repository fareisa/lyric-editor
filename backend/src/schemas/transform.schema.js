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
            "legacy",
            "original",
            "romaji",
            "translation",
            "original-romaji",
            "original-translation",
            "romaji-translation",
            "all"
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