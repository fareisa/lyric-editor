import { useEditor } from "../contexts/EditorContext";
import { getLyrics } from "../api/lyrics";

export default function useLyrics() {
  const {
    loadEditor,
    beginBusy,
    endBusy
  } = useEditor();

  async function loadLyrics(song) {
    beginBusy("Loading local lyrics...");

    try {
      const result = await getLyrics(song.id);

      loadEditor({
        source: "local",
        lyrics: result.lyrics ?? "",
        dirty: false
      });

    } catch {

      loadEditor({
        source: "local",
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