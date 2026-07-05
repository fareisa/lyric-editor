import "./Modal.css";
import { useEffect } from "react";

export default function Modal({
  open,
  title,
  onClose,
  children
}) {

  useEffect(() => {

    if (!open) {
      return;
    }

    function handleKeyDown(e) {

      if (e.key === "Escape") {
        onClose();
      }

    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (

    <div
      className="modal-overlay"
      onClick={onClose}
    >

      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="modal-header">

          <h2>{title}</h2>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <div className="modal-body">
          {children}
        </div>

      </div>

    </div>

  );

}