import { transformLyrics } from "../api/transform";
import { useEditor } from "../contexts/EditorContext";
import useUnsavedChanges from "./useUnsavedChanges";

export default function useTransformLyrics() {

  const {
    selectedSong,
    profile,
    sourceContent,
    updateEditorContent
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

    const result =
      await transformLyrics(
        selectedSong.id,
        profile,
        sourceContent
      );

    updateEditorContent(
      result.lyrics
    );

  }

  return {
    transform
  };

}