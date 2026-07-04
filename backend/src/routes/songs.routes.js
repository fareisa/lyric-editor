import songService from "../services/song.service.js";
import lyricService from "../services/lyric.service.js";
import fetchService from "../services/lyrics-fetch.service.js";
import NotFoundError from "../errors/not-found.error.js";

export default async function (app) {

  app.get("/songs", async () => {
    return songService.list();
  });
  
  app.post(
    "/songs/:id/fetch",

    async (request, reply) => {

      const song =
        songService.get(
          request.params.id
        );

      if (!song) {
        throw new NotFoundError(
            "Song not found"
        );
      }

      const lyrics =
        await fetchService.fetch(song);

      if (!lyrics) {
        throw new NotFoundError(
            "Lyric not found"
        );
      }
      return lyrics;
    }
  );

  app.get(
    "/songs/:id/lyrics",

    async (request, reply) => {
      const { id } = request.params;
      const song = songService.get(id);

      if (!song) {
        throw new NotFoundError(
            "Song not found"
        );
      }

      const lyrics =
        await lyricService.load(song);

      if (lyrics === null) {
        throw new NotFoundError(
            "Lyric not found"
        );
      }

      return {
        lyrics
      };
    }
  );

  app.put(
    "/songs/:id/lyrics",
    {
      schema: {
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
        }      
      }

    },

    async (request, reply) => {
      const { id } =
      request.params;
      const song =
      songService.get(id);

      if (!song) {
        return reply.code(404).send({
          message: "Song not found"
        });
      }
      await lyricService.save(
        song,
        request.body.lyrics
      );
      return {
        message: "Saved"
      };
    }
  );
}