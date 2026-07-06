import { saveLyrics } from "../api/lyrics";
import { useEditor } from "../contexts/EditorContext";

export default function useSaveLyrics() {
  const {
    selectedSong,
    editorContent,
    saveEditorContent,
    beginBusy,
    endBusy
  } = useEditor();

  async function save() {
    if (!selectedSong) {
      return;
    }

    beginBusy("Saving lyrics...");

    try {
      await saveLyrics(
        selectedSong.id,
        editorContent
      );

      saveEditorContent();

    } finally {

      endBusy();

    }
  }

  return {
    save
  };
}