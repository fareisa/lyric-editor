import api from "./api";

export async function transformLyrics(
  songId,
  profile,
  lyrics
) {

  const { data } =
    await api.post(
      `/songs/${songId}/lyrics/transform`,
      {
        profile,
        lyrics
      }
    );

  return data;

}