import "./Toolbar.css";
import { useState } from "react";
import { useEditor } from "../../contexts/EditorContext";
import useLyrics from "../../hooks/useLyrics";
import useFetchLyrics from "../../hooks/useFetchLyrics";
import useTransformLyrics from "../../hooks/useTransformLyrics";
import useSaveLyrics from "../../hooks/useSaveLyrics";
import useUnsavedChanges from "../../hooks/useUnsavedChanges";
import transformProfiles from "../../constants/transformProfiles";
import PasteDialog from "../PasteDialog/PasteDialog";

export default function Toolbar() {
  const {
    profile,
    setProfile,
    dirty,
    selectedSong,
    sourceType,
    translationTarget,
    setTranslationTarget,
    busy,
    busyMessage,
    loadEditor
  } = useEditor();

  const { loadLyrics } = useLyrics();
  const { fetch } = useFetchLyrics();
  const { transform } = useTransformLyrics();
  const { save } = useSaveLyrics();

  const { confirmDiscard } = useUnsavedChanges();

  const [pasteOpen, setPasteOpen] = useState(false);

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

  function handlePaste(lyrics) {
    if (!confirmDiscard()) {
      return;
    }

    loadEditor({
      source: "manual",
      lyrics,
      dirty: true
    });

    setPasteOpen(false);
  }

  return (
    <>
      <footer className="toolbar">
        <div className="toolbar-status">

          <div className="toolbar-status-item">
            <span>Source:</span>

            <span className="toolbar-source">
              {getSourceLabel()}
            </span>
          </div>

          <div className="toolbar-status-item">
            <span>Profile:</span>

            <select
              value={profile}
              disabled={busy}
              onChange={(e) => setProfile(e.target.value)}
            >
              {transformProfiles.map(item => (
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
            <span>Target:</span>

            <input
              className="toolbar-input"
              type="text"
              value={translationTarget}
              placeholder="en"
              maxLength={16}
              disabled={
                busy ||
                !profile.includes("translation")
              }
              onChange={(e) =>
                setTranslationTarget(e.target.value)
              }
            />
          </div>
          
          <div className="toolbar-status-item">
            {busy ? (
              <span className="status-busy">
                ⏳ {busyMessage}
              </span>
            ) : dirty ? (
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
            disabled={!selectedSong || busy}
            onClick={() => loadLyrics(selectedSong)}
          >
            Reload Local
          </button>

          <button
            disabled={!selectedSong || busy}
            onClick={fetch}
          >
            Fetch
          </button>

          <button
            disabled={!selectedSong || busy}
            onClick={() => setPasteOpen(true)}
          >
            Paste
          </button>

          <button
            disabled={!selectedSong || busy}
            onClick={transform}
          >
            Transform
          </button>

          <button
            disabled={!dirty || busy}
            onClick={save}
          >
            Save
          </button>

        </div>
      </footer>

      <PasteDialog
        open={pasteOpen}
        onClose={() => setPasteOpen(false)}
        onApply={handlePaste}
      />
    </>
  );
}