// src/App.jsx
import { useState } from "react";
import SolarSystem from "./components/SolarSystem";
import FactCard from "./components/FactCard";
export default function App() {
  const [currentFact, setCurrentFact] = useState(null);

  const handlePlanetClicked = (fact) => {
    setCurrentFact(fact);
  };
  return (
    <div className="page">
      <section className="scene">
        <div className="hero-content">
          <h1>Museum of Useless Details</h1>
          <p>
            a snarky little archive stuffed with space facts for anyone who wants to feel tiny,
            confused, and slightly judged by the universe.
          </p>
        </div>

        <div className="hero-visual">
          <SolarSystem onPlanetClicked={handlePlanetClicked} />
        </div>
      </section>

      <FactCard open={!!currentFact} fact={currentFact} onClose={() => setCurrentFact(null)} />
    </div>
  );
}
