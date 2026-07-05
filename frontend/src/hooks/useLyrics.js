import { useEditor } from "../contexts/EditorContext";
import { getLyrics } from "../api/lyrics";

export default function useLyrics() {

  const {
    loadLyrics: setLoadedLyrics,
    loadingLyrics,
    setLoadingLyrics
  } = useEditor();

  async function loadLyrics(song) {
    setLoadingLyrics(true);

    setLoadedLyrics("");

    try {
      const result = await getLyrics(song.id);
      setLoadedLyrics(result.lyrics ?? "");
    } catch {
      setLoadedLyrics("");
    } finally {
      setLoadingLyrics(false);
    }
  }

  return {
    loadLyrics,
    loadingLyrics
  };

}