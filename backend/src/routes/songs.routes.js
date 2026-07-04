import {
    listSongsSchema
}
from "../schemas/songs.schema.js";

import {
    getLyricsSchema,
    saveLyricsSchema,
    fetchLyricsSchema
}
from "../schemas/lyrics.schema.js";

import {
  listSongs,
  getLyrics,
  saveLyrics,
  fetchLyrics
} from "../handlers/songs.handler.js";

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
    "/songs/:id/fetch",
    fetchLyricsSchema,
    fetchLyrics
  );

}