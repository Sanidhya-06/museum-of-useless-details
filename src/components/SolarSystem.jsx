// src/components/SolarSystem.jsx
import React, { useEffect, useRef } from "react";
import Planet from "./Planet";
import facts from "../data/facts.json";
import pickRandom from "../utils/pickRandom";

export default function SolarSystem({ onPlanetClicked }) {
  const solarRef = useRef(null);
  const orbitRefs = useRef([]);

  useEffect(() => {
    const solar = solarRef.current;
    if (!solar) return;

    let frameId = null;

    const updateOnScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const progress = window.scrollY / scrollableHeight;
      const base = progress * 720; // two full rotations at max scroll

      const orbitSpeeds = [0.5, 0.7, 0.8, 1.35, 1.7, 1.5, 1.4, 1.2];
      orbitRefs.current.forEach((orbit, idx) => {
        if (!orbit) return;
        orbit.style.transform = `rotate(${base * orbitSpeeds[idx]}deg)`;
      });

      solar.style.transform = `scale(${1 + progress * 0.2})`;
    };

    const onScroll = () => {
      if (frameId) return;
      frameId = requestAnimationFrame(() => {
        frameId = null;
        updateOnScroll();
      });
    };

    updateOnScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateOnScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateOnScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  const planets = [
    { name: "Mercury", orbitClass: "orbit1", planetClass: "planet1" },
    { name: "Venus", orbitClass: "orbit2", planetClass: "planet2" },
    { name: "Earth", orbitClass: "orbit3", planetClass: "planet3" },
    { name: "Mars", orbitClass: "orbit4", planetClass: "planet4" },
    { name: "Jupiter", orbitClass: "orbit5", planetClass: "planet5" },
    { name: "Saturn", orbitClass: "orbit6", planetClass: "planet6" },
    { name: "Uranus", orbitClass: "orbit7", planetClass: "planet7" },
    { name: "Neptune", orbitClass: "orbit8", planetClass: "planet8" }
  ];

  return (
    <div className="solar-wrap">
      <div className="solar-system" ref={solarRef}>
        <div className="sun" aria-hidden="true" />

        {planets.map((p, idx) => (
          <div
            key={idx}
            className={`orbit ${p.orbitClass}`}
            ref={(el) => (orbitRefs.current[idx] = el)}
          >
            <Planet
              className={`planet ${p.planetClass}`}
              onClick={() => {
                const text = pickRandom(facts) || "No facts loaded.";
                onPlanetClicked({ text, planetName: p.name });
              }}
              ariaLabel={p.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
