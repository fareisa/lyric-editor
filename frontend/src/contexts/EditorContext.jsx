import { createContext, useContext, useState } from "react";

const EditorContext = createContext();

export function EditorProvider({ children }) {

  const [selectedSong, setSelectedSong] = useState(null);
  const [content, setContentState] = useState("");
  const [loadingLyrics, setLoadingLyrics] = useState(false);
  const [profile, setProfile] = useState("original");
  const [dirty, setDirty] = useState(false);

  function setContent(value) {
    setContentState(value);
    setDirty(true);
  }

  function replaceContent(value) {
    setContentState(value);
    setDirty(false);
  }

  const value = {
    selectedSong,
    setSelectedSong,

    content,
    setContent,
    replaceContent,

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