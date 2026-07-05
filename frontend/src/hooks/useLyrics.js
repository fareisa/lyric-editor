import { useEditor } from "../contexts/EditorContext";
import { getLyrics } from "../api/lyrics";

export default function useLyrics() {

  const {
    loadSourceContent,
    loadingLyrics,
    setLoadingLyrics
  } = useEditor();

  async function loadLyrics(song) {
    setLoadingLyrics(true);
    loadSourceContent("");

    try {
      const result = await getLyrics(song.id);
      loadSourceContent(
        result.lyrics ?? ""
      );
    } catch {
      loadSourceContent("");
    } finally {
      setLoadingLyrics(false);
    }
  }

  return {
    loadLyrics,
    loadingLyrics
  };

}