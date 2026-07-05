import { createContext, useContext, useState } from "react";

const EditorContext = createContext();

export function EditorProvider({ children }) {

  const [selectedSong, setSelectedSong] = useState(null);
  const [lyrics, setLyrics] = useState("");
  const [loadingLyrics, setLoadingLyrics] = useState(false);
  const [profile, setProfile] = useState("original");
  const [dirty, setDirty] = useState(false);

  const value = {
    selectedSong,
    setSelectedSong,

    lyrics,
    setLyrics,

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
