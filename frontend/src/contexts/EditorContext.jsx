import { createContext, useContext, useState } from "react";

const EditorContext = createContext();

export function EditorProvider({ children }) {

  const [selectedSong, setSelectedSong] = useState(null);
  const [sourceContent, setSourceContent] = useState("");
  const [editorContent, setEditorContentState] = useState("");
  const [loadingLyrics, setLoadingLyrics] = useState(false);
  const [profile, setProfile] = useState("original-translation");
  const [dirty, setDirty] = useState(false);

  function setEditorContent(value) {
    setEditorContentState(value);
    setDirty(true);
  }

  function replaceEditorContent(value) {
    setEditorContentState(value);
    setDirty(false);
  }

  function loadSourceContent(value) {
    setSourceContent(value);
    setEditorContentState(value);
    setDirty(false);
  }

  const value = {
    selectedSong,
    setSelectedSong,

    sourceContent,
    setSourceContent,

    editorContent,
    setEditorContent,

    replaceEditorContent,
    loadSourceContent,

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