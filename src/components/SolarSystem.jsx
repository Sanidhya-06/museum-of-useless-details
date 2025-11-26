// src/components/SolarSystem.jsx
import React, { useEffect, useRef } from "react";
import Planet from "./Planet";
import facts from "../data/facts.json";
import pickRandom from "../utils/pickRandom";


export default function SolarSystem({ onPlanetClicked }) {
  const sceneRef = useRef(null);
  const solarRef = useRef(null);
  const orbitRefs = useRef([]);

  useEffect(() => {
    const scene = sceneRef.current;
    const solar = solarRef.current;

    if (!scene || !solar) return;

    let viewPortHeight = window.innerHeight;
    const handleResize = () => {
      viewPortHeight = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let frameId = null;
    const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

    const updateOnScroll = () => {
      const rect = scene.getBoundingClientRect();
      const start = viewPortHeight;
      const end = -viewPortHeight;
      const current = rect.top;

      let progress = (start - current) / (start - end);
      progress = clamp(progress, 0, 1);

      const base = progress * 720; // two full rotations at max

      const orbitSpeeds = [0.5, 0.7, 0.8, 1.35, 1.7, 1.5, 1.4, 1.2];
      orbitRefs.current.forEach((orbit, idx) => {
        if (!orbit) return;
        orbit.style.transform = `rotate(${base * orbitSpeeds[idx]}deg)`;
      });

      solar.style.transform = `scale(${1 + progress * 0.4})`;
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

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  const planets = [
    { orbitClass: "orbit1", planetClass: "planet1" },
    { orbitClass: "orbit2", planetClass: "planet2" },
    { orbitClass: "orbit3", planetClass: "planet3" },
    { orbitClass: "orbit4", planetClass: "planet4" },
    { orbitClass: "orbit5", planetClass: "planet5" },
    { orbitClass: "orbit6", planetClass: "planet6" },
    { orbitClass: "orbit7", planetClass: "planet7" },
    { orbitClass: "orbit8", planetClass: "planet8" }
  ];

  return (
    <div ref={sceneRef} className="solar-wrap">
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
                const fact = pickRandom(facts) || "No facts loaded.";
                onPlanetClicked(fact);
              }}
              ariaLabel={`Planet ${idx + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
