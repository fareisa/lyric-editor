import useLyrics from "./useLyrics";
import useFetchLyrics from "./useFetchLyrics";
import { useEditor } from "../contexts/EditorContext";

export default function useSourceManager() {

  const {
    selectedSong
  } = useEditor();

  const {
    loadLyrics
  } = useLyrics();

  const {
    fetch
  } = useFetchLyrics();

  async function selectSource(type) {

    if (!selectedSong) {
      return;
    }

    switch (type) {
      case "local":
        await loadLyrics(selectedSong);
        break;
      case "external":
        await fetch();
        break;
      case "manual":
        console.log(
          "Manual source not implemented."
        );
        break;

      default:
        break;
    }
  }

  return {
    selectSource
  };

}
