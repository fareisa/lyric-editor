import { 
  idParamSchema 
} 
from "./common.schema.js";

export const getLyricsSchema = {
  schema: {
    params: idParamSchema,
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

export const saveLyricsSchema = {

  schema: {
    params: idParamSchema,
    body: {
      type: "object",
      required: [
        "lyrics"
      ],
      properties: {
        lyrics: {
          type: "string"
        }
      }
    },

    response: {
      200: {
        type: "object",
        properties: {
          message: {
            type: "string"
          }
        }
      }
    }
  }

};

export const fetchLyricsSchema = {

  schema: {
    params: idParamSchema,
    response: {
      200: {
        type: "object",
        properties: {
          artist: {
            type: "string"
          },
          title: {
            type: "string"
          },
          syncedLyrics: {
            type: ["string","null"]
          },
          plainLyrics: {
            type: ["string","null"]
          }
        }
      }
    }
  }
};