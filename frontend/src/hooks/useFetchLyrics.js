import { fetchLyrics } from "../api/fetch";
import { useEditor } from "../contexts/EditorContext";
import useUnsavedChanges from "./useUnsavedChanges";

export default function useFetchLyrics() {

  const { confirmDiscard } = "./useUnsavedChanges";

  const {
    selectedSong,
    replaceContent,
    setDirty
  } = useEditor();

  async function fetch() {

    if (!selectedSong) {
      return;
    }

    if (!confirmDiscard()) {
      return;
    }

    const result = await fetchLyrics(
      selectedSong.id
    );

    replaceContent(
      result.syncedLyrics ??
      result.plainLyrics ??
      ""
    );

    setDirty(true);

  }

  return {
    fetch
  };

}