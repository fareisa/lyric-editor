import { transformLyrics } from "../api/transform";
import { useEditor } from "../contexts/EditorContext";
import useUnsavedChanges from "./useUnsavedChanges";

export default function useTransformLyrics() {
  const {
    selectedSong,
    profile,
    sourceContent,
    updateEditorContent,
    beginBusy,
    endBusy
  } = useEditor();

  const {
    confirmDiscard
  } = useUnsavedChanges();

  async function transform() {
    if (!selectedSong) {
      return;
    }

    if (!sourceContent) {
      return;
    }

    if (!confirmDiscard()) {
      return;
    }

    beginBusy("Transforming lyrics...");

    try {
      const result = await transformLyrics(
        selectedSong.id,
        profile,
        sourceContent
      );

      updateEditorContent(
        result.lyrics
      );

    } finally {

      endBusy();

    }
  }

  return {
    transform
  };
}