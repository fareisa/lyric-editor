import { saveLyrics } from "../api/lyrics";
import { useEditor } from "../contexts/EditorContext";

export default function useSaveLyrics() {

  const {
    selectedSong,
    editorContent,
    saveEditorContent
  } = useEditor();

  async function save() {

    if (!selectedSong) {
      return;
    }

    await saveLyrics(
      selectedSong.id,
      editorContent
    );

    saveEditorContent();

  }

  return {
    save
  };

}