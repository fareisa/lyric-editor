import "./Editor.css";
import MonacoEditor from "@monaco-editor/react";
import { useEditor } from "../../contexts/EditorContext";
import { useEffect } from "react";
import useSaveLyrics from "../../hooks/useSaveLyrics";

export default function Editor() {

  const { save } = useSaveLyrics();
  useEffect(() => {
    function handleKeyDown(e) {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key === "s"
      ) {
        e.preventDefault();
        save();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [save]);

  const {
    selectedSong,
    lyrics,
    setLyrics,
    loadingLyrics
  } = useEditor();

  if (!selectedSong) {
    return (
      <main className="editor">
        <h2>No song selected</h2>
        <p>Select a song from the sidebar.</p>
      </main>
    );
  }

  if (loadingLyrics) {
    return (
      <main className="editor">
        Loading...
      </main>
    );
  }

  return (
    <main className="editor">
      <MonacoEditor
        height="100%"
        language="plaintext"
        theme="vs-dark"
        value={lyrics}
        onChange={(value) => setLyrics(value ?? "")}
        options={{
          minimap: {
            enabled: false
          },
          wordWrap: "on",
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true
        }}
      />
    </main>
  );

}