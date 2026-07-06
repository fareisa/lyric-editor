import { transformLyrics } from "../api/transform";
import { useEditor } from "../contexts/EditorContext";
import useUnsavedChanges from "./useUnsavedChanges";

export default function useTransformLyrics() {
  const {
    selectedSong,
    profile,
    originalContent,
    updateEditorContent,
    translationTarget,
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

    if (!originalContent.trim()) {
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
        translationTarget.trim() || "en",
        originalContent
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