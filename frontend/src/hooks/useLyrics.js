import { useEditor } from "../contexts/EditorContext";
import { getLyrics } from "../api/lyrics";

export default function useLyrics() {

  const {
    replaceContent,
    loadingLyrics,
    setLoadingLyrics
  } = useEditor();

  async function loadLyrics(song) {
    setLoadingLyrics(true);
    
    replaceContent("");

    try {
      const result = await getLyrics(song.id);
      replaceContent(
        result.lyrics ?? ""
      );
    } catch {
      replaceContent("");
    } finally {
      setLoadingLyrics(false);
    }
  }

  return {
    loadLyrics,
    loadingLyrics
  };

}