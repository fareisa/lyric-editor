import { useEditor } from "../contexts/EditorContext";
import { getLyrics } from "../api/lyrics";

export default function useLyrics() {

  const {
    loadLyricsFromDisk,
    loadingLyrics,
    setLoadingLyrics
  } = useEditor();

  async function loadLyrics(song) {
    setLoadingLyrics(true);
    loadLyricsFromDisk("");

    try {
      const result = await getLyrics(song.id);
      loadLyricsFromDisk(
        result.lyrics ?? ""
      );
    } catch {
      loadLyricsFromDisk("");
    } finally {
      setLoadingLyrics(false);
    }
  }

  return {
    loadLyrics,
    loadingLyrics
  };

}