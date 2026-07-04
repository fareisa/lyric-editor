export const listSongsSchema = {

  schema: {
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string"
            },
            title: {
              type: "string"
            },
            artist: {
              type: "string"
            },
            album: {
              type: "string"
            },
            duration: {
              type: "number"
            },
            hasLyrics: {
              type: "boolean"
            }
          }
        }
      }
    }
  }
};