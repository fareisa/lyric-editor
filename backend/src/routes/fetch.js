import songService from "../services/song.service.js";
import fetchService from "../services/lyrics-fetch.service.js";

export default async function (app) {

  app.post(
    "/songs/:id/fetch",

    async (request, reply) => {

      const song =
        songService.get(
          request.params.id
        );

      if (!song) {
        return reply.code(404).send({
          message: "Song not found"
        });
      }

      const lyrics =
        await fetchService.fetch(song);

      if (!lyrics) {
        return reply.code(404).send({
          message: "Lyrics not found"
        });
      }
      return lyrics;
    }
  );
}