import api from "./api";

export async function transformLyrics(id, profile) {

  const { data } = await api.post(
    `/songs/${id}/lyrics/transform`,
    {
      profile
    }
  );

  return data;

}