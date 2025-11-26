// src/components/FactCard.jsx
import React from "react";

export default function FactCard({ open, fact, onClose }) {
  if (!open || !fact) return null;

  //TODO: improvement 
  return (
    <div className="fact-card" role="dialog" aria-modal="true">
      <button className="close-btn" onClick={onClose} aria-label="Close">
        ×
      </button>
      <p>{fact}</p>
    </div>
  );
}
