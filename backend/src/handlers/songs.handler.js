import songService from "../services/song.service.js";
import lyricService from "../services/lyric.service.js";
import fetchService from "../services/lyrics-fetch.service.js";
import NotFoundError from "../errors/not-found.error.js";

export async function listSongs() {
  return songService.list();
}

export async function getLyrics(request) {
  const song = songService.get(request.params.id);

  if (!song) {
    throw new NotFoundError("Song not found");
  }

  const lyrics = await lyricService.load(song);

  if (lyrics === null) {
    throw new NotFoundError("Lyrics not found");
  }

  return { lyrics };
}

export async function saveLyrics(request) {
  const song = songService.get(request.params.id);

  if (!song) {
    throw new NotFoundError("Song not found");
  }

  await lyricService.save(song, request.body.lyrics);

  return {
    message: "Saved"
  };
}

export async function fetchLyrics(request) {
  const song = songService.get(request.params.id);

  if (!song) {
    throw new NotFoundError("Song not found");
  }

  return await fetchService.fetch(song);
}