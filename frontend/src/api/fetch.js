import api from "./api";

export async function fetchLyrics(id) {
  const { data } = await api.post(
    `/songs/${id}/lyrics/fetch`
  );
  return data;
}