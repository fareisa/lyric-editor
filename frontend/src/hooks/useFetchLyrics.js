import { fetchLyrics } from "../api/fetch";
import { useEditor } from "../contexts/EditorContext";

export default function useFetchLyrics() {

  const {
    selectedSong,
    replaceContent,
    setDirty
  } = useEditor();

  async function fetch() {

    if (!selectedSong) {
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