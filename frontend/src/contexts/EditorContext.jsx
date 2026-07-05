import { createContext, useContext, useState } from "react";

const EditorContext = createContext();

export function EditorProvider({ children }) {

  const [selectedSong, setSelectedSong] = useState(null);

  const [sourceType, setSourceType] = useState(null);
  const [sourceContent, setSourceContent] = useState("");

  const [editorContent, setEditorContentState] = useState("");

  const [loadingLyrics, setLoadingLyrics] = useState(false);

  const [profile, setProfile] = useState(
    "original-romaji"
  );

  const [dirty, setDirty] = useState(false);

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

    loadingLyrics,
    setLoadingLyrics,

    profile,
    setProfile,

    dirty,
    setDirty

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