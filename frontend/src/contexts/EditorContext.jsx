import { createContext, useContext, useState } from "react";

const EditorContext = createContext();

export function EditorProvider({ children }) {
  const [selectedSong, setSelectedSong] = useState(null);

  const [sourceType, setSourceType] = useState(null);
  const [sourceContent, setSourceContent] = useState("");

  const [editorContent, setEditorContentState] = useState("");

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
    setEditorContentState(value);
    setDirty(true);
  }

  function loadSourceLyrics({
    type,
    lyrics,
    dirty
  }) {
    setSourceType(type);
    setSourceContent(lyrics);
    setEditorContentState(lyrics);
    setDirty(dirty);
  }

  function saveEditorContent() {
    setSourceContent(editorContent);
    setDirty(false);
  }

  const value = {
    selectedSong,
    setSelectedSong,

    sourceType,
    sourceContent,

    editorContent,
    updateEditorContent,

    loadSourceLyrics,

    saveEditorContent,

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