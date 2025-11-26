// src/components/Planet.jsx
import React from "react";

export default function Planet({ className = "planet", onClick, ariaLabel }) {
  return (
    <button
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
      title={ariaLabel}
      style={{ outline: "none" }}
    />
  );
}
