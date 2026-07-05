import api from "./api";

export async function getSongs() {
  const { data } = await api.get("/songs");
  return data;
}