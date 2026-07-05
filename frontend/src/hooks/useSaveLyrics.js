import { saveLyrics } from "../api/lyrics";
import { useEditor } from "../contexts/EditorContext";

export default function useSaveLyrics() {

  const {
    selectedSong,
    content,
    setDirty
  } = useEditor();

  async function save() {

    if (!selectedSong) {
      return;
    }

    await saveLyrics(
      selectedSong.id,
      content
    );
    setDirty(false);
  }

  return {
    save
  };

}