import { useEditor } from "../contexts/EditorContext";
import { getLyrics } from "../api/lyrics";

export default function useLyrics() {
  const {
    loadSourceLyrics,
    beginBusy,
    endBusy
  } = useEditor();

  async function loadLyrics(song) {
    beginBusy("Loading local lyrics...");

    loadSourceLyrics({
      type: "local",
      lyrics: "",
      dirty: false
    });

    try {
      const result = await getLyrics(song.id);

      loadSourceLyrics({
        type: "local",
        lyrics: result.lyrics ?? "",
        dirty: false
      });

    } catch {

      loadSourceLyrics({
        type: "local",
        lyrics: "",
        dirty: false
      });

    } finally {

      endBusy();

    }
  }

  return {
    loadLyrics
  };
}