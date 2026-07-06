import "./Editor.css";
import { useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useEditor } from "../../contexts/EditorContext";
import useSaveLyrics from "../../hooks/useSaveLyrics";

export default function Editor() {
  const {
    selectedSong,
    editorContent,
    updateEditorContent,
    busy,
    busyMessage
  } = useEditor();

  const { save } = useSaveLyrics();

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        save();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [save]);

  if (!selectedSong) {
    return (
      <main className="editor">
        <h2>No song selected</h2>
        <p>Select a song from the sidebar.</p>
      </main>
    );
  }

  if (busy && busyMessage === "Loading local lyrics...") {
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
        value={editorContent}
        onChange={(value) =>
          updateEditorContent(value ?? "")
        }
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