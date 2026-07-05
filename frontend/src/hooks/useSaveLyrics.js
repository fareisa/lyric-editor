import { saveLyrics } from "../api/lyrics";
import { useEditor } from "../contexts/EditorContext";

export default function useSaveLyrics() {

  const {
    selectedSong,
    lyrics,
    setDirty
  } = useEditor();

  async function save() {

    if (!selectedSong) {
      return;
    }

    await saveLyrics(
      selectedSong.id,
      lyrics
    );
    setDirty(false);
  }

  return {
    save
  };

}