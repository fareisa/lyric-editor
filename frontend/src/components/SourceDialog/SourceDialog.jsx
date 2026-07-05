import "./SourceDialog.css";
import { useState } from "react";
import Modal from "../Modal/Modal";

const sources = [
  {
    id: "local",
    icon: "📁",
    title: "Local Lyrics",
    description: "Use lyrics stored on disk."
  },
  {
    id: "external",
    icon: "🌐",
    title: "External Lyrics",
    description: "Fetch lyrics from LRCLIB."
  },
  {
    id: "manual",
    icon: "📋",
    title: "Paste Lyrics",
    description: "Paste your own lyrics."
  }
];

export default function SourceDialog({
  open,
  onClose
}) {

  const [selected, setSelected] =
    useState("local");

  function handleContinue() {

    console.log(
      "Selected:",
      selected
    );

    onClose();

  }

  return (

    <Modal
      open={open}
      title="Select Source"
      onClose={onClose}
    >

      <div className="source-list">

        {sources.map(source => (

          <button
            key={source.id}
            className={
              selected === source.id
                ? "source-card active"
                : "source-card"
            }
            onClick={() =>
              setSelected(source.id)
            }
          >

            <div className="source-icon">
              {source.icon}
            </div>

            <div>

              <div className="source-title">
                {source.title}
              </div>

              <div className="source-description">
                {source.description}
              </div>

            </div>

          </button>

        ))}

      </div>

      <div className="source-actions">

        <button
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          onClick={handleContinue}
        >
          Continue
        </button>

      </div>

    </Modal>

  );

}
