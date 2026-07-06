import { useEditor } from "../contexts/EditorContext";
import { getLyrics } from "../api/lyrics";
import useUnsavedChanges from "./useUnsavedChanges";

export default function useLyrics() {
  const {
    loadEditor,
    beginBusy,
    endBusy
  } = useEditor();

  const {
    confirmDiscard
  } = useUnsavedChanges();

  async function loadLyrics(song) {
    if (!song) {
      return;
    }

    if (!confirmDiscard()) {
      return;
    }

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