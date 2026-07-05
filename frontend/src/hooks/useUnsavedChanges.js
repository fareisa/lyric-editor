import { useEditor } from "../contexts/EditorContext";

export default function useUnsavedChanges() {

  const { dirty } = useEditor();

  function confirmDiscard() {

    if (!dirty) {
      return true;
    }

    return window.confirm(
      "You have unsaved changes.\n\nDiscard them?"
    );

  }

  return {
    confirmDiscard
  };

}