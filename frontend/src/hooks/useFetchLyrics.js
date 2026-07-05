import { fetchLyrics } from "../api/fetch";
import { useEditor } from "../contexts/EditorContext";
import useUnsavedChanges from "./useUnsavedChanges";

export default function useFetchLyrics() {

  const {
    selectedSong,
    loadFetchedLyrics
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

    const result = await fetchLyrics(
      selectedSong.id
    );

    loadFetchedLyrics(
      result.syncedLyrics ??
      result.plainLyrics ??
      ""
    );

  }

  return {
    fetch
  };

}