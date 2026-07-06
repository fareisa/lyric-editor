import { fetchLyrics } from "../api/fetch";
import { useEditor } from "../contexts/EditorContext";
import useUnsavedChanges from "./useUnsavedChanges";

export default function useFetchLyrics() {
  const {
    selectedSong,
    loadEditor,
    beginBusy,
    endBusy
  } = useEditor();

  const {
    confirmDiscard
  } = useUnsavedChanges();

  async function fetch() {
    if (!selectedSong) {
      return;
    }

    if (!confirmDiscard()) {
      return;
    }

    beginBusy("Fetching lyrics...");

    try {
      const result = await fetchLyrics(
        selectedSong.id
      );

      loadEditor({
        source: "external",
        lyrics:
          result.syncedLyrics ??
          result.plainLyrics ??
          "",
        dirty: true
      });

    } finally {

      endBusy();

    }
  }

  return {
    fetch
  };
}