import "./Editor.css";
import { useEditor } from "../../contexts/EditorContext";

export default function Editor() {

  const {
    selectedSong,
    lyrics,
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
      <h2>
        {selectedSong.title}
      </h2>
      <pre>
        {lyrics}
      </pre>
    </main>
  );
}