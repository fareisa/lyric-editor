import { listSongsSchema } from "../schemas/songs.schema.js";
import { getLyricsSchema, saveLyricsSchema, fetchLyricsSchema } from "../schemas/lyrics.schema.js";
import { listSongs, getLyrics, saveLyrics, fetchLyrics } from "../handlers/songs.handler.js";
import { transformLyricsSchema } from "../schemas/transform.schema.js";
import { transformLyrics } from "../handlers/transform.handler.js";

export default async function (app) {

  app.get(
    "/songs",
    listSongsSchema,
    listSongs
  );

  app.get(
    "/songs/:id/lyrics",
    getLyricsSchema,
    getLyrics
  );

  app.put(
    "/songs/:id/lyrics",
    saveLyricsSchema,
    saveLyrics
  );

  app.post(
    "/songs/:id/lyrics/fetch",
    fetchLyricsSchema,
    fetchLyrics
  );

  app.post(
    "/songs/:id/lyrics/transform",
    transformLyricsSchema,
    transformLyrics
  );

}