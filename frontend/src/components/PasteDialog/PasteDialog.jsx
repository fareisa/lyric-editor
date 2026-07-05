import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import "./PasteDialog.css";

export default function PasteDialog({
  open,
  onClose,
  onApply
}) {
  const [lyrics, setLyrics] = useState("");

  useEffect(() => {
    if (open) {
      setLyrics("");
    }
  }, [open]);

  function handleApply() {
    onApply(lyrics);
    onClose();
  }

  return (
    <Modal
      open={open}
      title="Paste Lyrics"
      onClose={onClose}
    >
      <textarea
        className="paste-editor"
        value={lyrics}
        onChange={(e) => setLyrics(e.target.value)}
        placeholder="Paste lyrics here..."
        spellCheck={false}
      />

      <div className="paste-actions">
        <button onClick={onClose}>
          Cancel
        </button>

        <button
          onClick={handleApply}
          disabled={!lyrics.trim()}
        >
          Apply
        </button>
      </div>
    </Modal>
  );
}
