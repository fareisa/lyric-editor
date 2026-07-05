import api from "./api";

export async function getLyrics(id) {

  const { data } = await api.get(
    `/songs/${id}/lyrics`
  );
  return data;

}

export async function saveLyrics(id, lyrics) {

  const { data } = await api.put(
    `/songs/${id}/lyrics`,
    { lyrics }
  );
  return data;

}