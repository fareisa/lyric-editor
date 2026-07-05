import api from "./api";

export async function transformLyrics(id, body) {

  const { data } = await api.post(
    `/songs/${id}/lyrics/transform`,
    {
      body
    }
  );

  return data;

}