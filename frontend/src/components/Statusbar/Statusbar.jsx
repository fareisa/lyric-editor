import "./Statusbar.css";
import { useEditor } from "../../contexts/EditorContext";

export default function Statusbar() {

  const {
    dirty,
    selectedSong
  } = useEditor();

  return (
    <footer className="statusbar">

      <span>
        {selectedSong
          ? selectedSong.title
          : "No song selected"}
      </span>

      <span>
        {dirty ? "Modified" : "Saved"}
      </span>

    </footer>
  );

}