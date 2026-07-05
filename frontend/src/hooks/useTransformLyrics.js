import { transformLyrics } from "../api/transform";
import { useEditor } from "../contexts/EditorContext";
import useUnsavedChanges from "./useUnsavedChanges";

export default function useTransformLyrics() {

  const {
    selectedSong,
    profile,
    replaceContent,
    setDirty
  } = useEditor();

  const { confirmDiscard } = useUnsavedChanges();

  async function transform() {

    if (!selectedSong) {
      return;
    }

    if (!confirmDiscard()) {
      return;
    }

    const body = {
      profile,
      romaji: false,
      translate: false
    };

    if (
      profile.includes("romaji") ||
      profile === "all"
    ) {
      body.romaji = true;
    }

    if (
      profile.includes("translation") ||
      profile === "all" ||
      profile === "legacy"
    ) {
      body.translate = true;
    }

    const result = await transformLyrics(
      selectedSong.id,
      body
    );

    replaceContent(
      result.lyrics ?? ""
    );

    setDirty(true);

  }

  return {
    transform
  };

}