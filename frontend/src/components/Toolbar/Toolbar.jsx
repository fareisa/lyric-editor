import "./Toolbar.css";
import { useState } from "react";
import { useEditor } from "../../contexts/EditorContext";
import useFetchLyrics from "../../hooks/useFetchLyrics";
import useTransformLyrics from "../../hooks/useTransformLyrics";
import useSaveLyrics from "../../hooks/useSaveLyrics";
import transformProfiles from "../../constants/transformProfiles";
import SourceDialog from "../SourceDialog/SourceDialog";

export default function Toolbar() {
  const {
    dirty,
    profile,
    setProfile,
    selectedSong,
    sourceType
  } = useEditor();

  const { fetch } = useFetchLyrics();
  const { transform } = useTransformLyrics();
  const { save } = useSaveLyrics();

  const [sourceDialogOpen, setSourceDialogOpen] = useState(false);

  function getSourceLabel() {
    switch (sourceType) {
      case "external":
        return "🌐 External";
      case "manual":
        return "📋 Manual";
      default:
        return "📁 Local";
    }
  }

  return (
    <>
      <footer className="toolbar">
        <div className="toolbar-status">
          <div className="toolbar-status-item">
            <span>Source:</span>

            <button
              className="toolbar-status-button"
              disabled={!selectedSong}
              onClick={() => setSourceDialogOpen(true)}
            >
              {getSourceLabel()} ▼
            </button>
          </div>

          <div className="toolbar-status-item">
            <span>Profile:</span>

            <select
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
            >
              {transformProfiles.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="toolbar-status-item">
            {dirty ? (
              <span className="status-unsaved">
                ● Unsaved Changes
              </span>
            ) : (
              <span className="status-saved">
                ✓ Saved
              </span>
            )}
          </div>
        </div>

        <div className="toolbar-actions">
          <button
            disabled={!selectedSong}
            onClick={fetch}
          >
            Fetch
          </button>

          <button
            disabled={!selectedSong}
            onClick={() => setSourceDialogOpen(true)}
          >
            Change Source
          </button>

          <button
            disabled={!selectedSong}
            onClick={transform}
          >
            Transform
          </button>

          <button
            disabled={!dirty}
            onClick={save}
          >
            Save
          </button>
        </div>
      </footer>

      <SourceDialog
        open={sourceDialogOpen}
        onClose={() => setSourceDialogOpen(false)}
      />
    </>
  );
}