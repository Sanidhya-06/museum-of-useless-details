// src/components/FactCard.jsx
import React, { useEffect } from "react";

export default function FactCard({ open, fact, onClose }) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open || !fact) return null;

  return (
    <>
      <div className="fact-overlay" onClick={onClose} aria-hidden="true" />
      <div className="fact-card" role="dialog" aria-modal="true" aria-labelledby="fact-title">
        <button className="close-btn" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <span id="fact-title" className="fact-card-planet">
          Fact about {fact.planetName}
        </span>
        <p>{fact.text}</p>
      </div>
    </>
  );
}
