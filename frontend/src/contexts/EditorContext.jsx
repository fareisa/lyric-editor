import { createContext, useContext, useState } from "react";

const EditorContext = createContext();

export function EditorProvider({ children }) {

  const [selectedSong, setSelectedSong] = useState(null);
  const [sourceContent, setSourceContent] = useState("");
  const [editorContent, setEditorContentState] = useState("");
  const [loadingLyrics, setLoadingLyrics] = useState(false);

  const [profile, setProfile] = useState("original-romaji");
  const [dirty, setDirty] = useState(false);

  function updateEditorContent(value) {
    setEditorContentState(value);
    setDirty(true);
  }

  function loadLyricsFromDisk(value) {
    setSourceContent(value);
    setEditorContentState(value);
    setDirty(false);
  }

  function loadFetchedLyrics(value) {
    setSourceContent(value);
    setEditorContentState(value);
    setDirty(true);
  }

  function saveEditorContent() {
    setSourceContent(editorContent);
    setDirty(false);
  }

  const value = {

    selectedSong,
    setSelectedSong,

    sourceContent,

    editorContent,
    updateEditorContent,

    loadLyricsFromDisk,
    loadFetchedLyrics,

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