import { useEditor } from "../contexts/EditorContext";
import { getLyrics } from "../api/lyrics";

export default function useLyrics() {

  const {
    setLyrics,
    loadingLyrics,
    setLoadingLyrics
  } = useEditor();

  async function loadLyrics(song) {
    setLoadingLyrics(true);

    // Clear previous lyrics immediately
    setLyrics("");

    try {
      const result = await getLyrics(song.id);
      setLyrics(result.lyrics ?? "");
    } catch (err) {
      // No lyrics found
      setLyrics("No Lyric yet");
    } finally {
      setLoadingLyrics(false);
    }
  }

  return {
    loadLyrics,
    loadingLyrics
  };

}