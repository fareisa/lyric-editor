import { createContext, useContext, useState } from "react";

const EditorContext = createContext();

export function EditorProvider({ children }) {
  const [selectedSong, setSelectedSong] = useState(null);

  const [sourceType, setSourceType] = useState("local");

  const [originalContent, setOriginalContent] = useState("");
  const [editorContent, setEditorContent] = useState("");

  const [profile, setProfile] = useState("original-translation");

  const [dirty, setDirty] = useState(false);

  const [busy, setBusy] = useState(false);
  const [busyMessage, setBusyMessage] = useState("");

  function beginBusy(message) {
    setBusy(true);
    setBusyMessage(message);
  }

  function endBusy() {
    setBusy(false);
    setBusyMessage("");
  }

  function updateEditorContent(value) {
    setEditorContent(value);
    setDirty(true);
  }

  function loadEditor({
    source,
    lyrics,
    dirty = false
  }) {
    setSourceType(source);

    setOriginalContent(lyrics);
    setEditorContent(lyrics);

    setDirty(dirty);
  }

  function saveEditor() {
    setOriginalContent(editorContent);
    setSourceType("local");
    setDirty(false);
  }

  function clearEditor() {
    setSourceType("local");
    setOriginalContent("");
    setEditorContent("");
    setDirty(false);
  }

  const value = {
    selectedSong,
    setSelectedSong,

    sourceType,

    originalContent,
    editorContent,

    updateEditorContent,
    loadEditor,
    saveEditor,
    clearEditor,

    profile,
    setProfile,

    dirty,
    setDirty,

    busy,
    busyMessage,
    beginBusy,
    endBusy
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  return useContext(EditorContext);
}