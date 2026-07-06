import api from "./api";

export async function transformLyrics(
  songId,
  profile,
  target,
  lyrics
) {

  const { data } =
    await api.post(
      `/songs/${songId}/lyrics/transform`,
      {
        profile,
        target,
        lyrics
      }
    );

  return data;

}