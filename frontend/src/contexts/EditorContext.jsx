import { createContext, useContext, useState } from "react";

const EditorContext = createContext();

export function EditorProvider({ children }) {

  const [selectedSong, setSelectedSong] = useState(null);
  const [loadingLyrics, setLoadingLyrics] = useState(false);
  const [profile, setProfile] = useState("original");
  const [dirty, setDirty] = useState(false);
  const [lyrics, setLyricsState] = useState("");

  function setLyrics(value) {
    setLyricsState(value);
    setDirty(true);
  }

  function loadLyrics(value) {
    setLyricsState(value);
    setDirty(false);
  }

  const value = {
    selectedSong,
    setSelectedSong,

    lyrics,
    setLyrics,
    loadLyrics,

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
