import { idParamSchema } from "./common.schema.js";

export const transformLyricsSchema = {
  schema: {
    params: idParamSchema,
    body: {
      type: "object",
      properties: {
        romaji: {
          type: "boolean"
        },
        translate: {
          type: "boolean"
        },
        overwrite: {
            type: "boolean"
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