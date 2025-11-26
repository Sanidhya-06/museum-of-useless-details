import { useEffect, useRef, useState } from "react";
import "./App.css";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function App() {
  const sceneRef = useRef(null);
  const solarRef = useRef(null);

  const orbit1Ref = useRef(null);
  const orbit2Ref = useRef(null);
  const orbit3Ref = useRef(null);
  const orbit4Ref = useRef(null);
  const orbit5Ref = useRef(null);
  const orbit6Ref = useRef(null);
  const orbit7Ref = useRef(null);
  const orbit8Ref = useRef(null);

  // ---------- SPACE FACTS ----------
  const facts = [
  "Astronauts say the airlock smells like hot metal and seared steak. Yeah, space basically smells like a burnt frying pan. Romantic, right?",
  "Olympus Mons on Mars is the tallest volcano in the solar system, about three times taller than Everest.",
  "Voyager 1, launched in 1977, is now in interstellar space and still sending data with less computing power than a smartphone.",
  "Venus has an atmosphere full of sulfuric acid, surface temperatures hot enough to melt lead, and metallic rain.",
  "The Milky Way is on a collision course with the Andromeda galaxy in about 4.5 billion years.",
  "A day on Mercury (one rotation) lasts longer than its year (one orbit).",
  "Black holes are extremely dense objects that warp time so much that someone falling in appears frozen at the event horizon.",
  "Sagittarius B2, a giant cloud near the center of the galaxy, contains enough ethyl alcohol for 400 trillion pints of beer.",
  "The Sun holds 99.86% of all the mass in the solar system.",
  "UY Scuti is one of the largest known stars and could engulf orbits up to Mars if placed at the center of our solar system.",
  "Rogue planets drift through space without a star, possibly still having internal heat and oceans.",
  "The Eridanus Supervoid is roughly one billion light-years across and so empty that some scientists speculate it may relate to physics we don't fully understand.",
  "Saturn's rings are slowly disappearing and will likely vanish in about 100 million years as the ring material falls into the planet.",
  "The exoplanet HD 189733b experiences sideways rain made of molten glass and winds over 5,000 mph.",
  "Time runs slower near massive objects due to gravitational time dilation, so astronauts age slightly faster than people on Earth.",
  "Jupiter's Great Red Spot is a storm that has been raging for at least 350 years and possibly far longer.",
  "The Boomerang Nebula is the coldest known place in the universe at around –272°C, just one degree above absolute zero.",
  "Stars create pressure waves that can be converted into sound-like patterns, which means they 'sing' in a measurable way.",
  "A teaspoon of neutron-star material would weigh more than Mount Everest due to its extreme density.",
  "A rogue black hole is drifting through the Milky Way, detected by its gravitational effects despite having no companion star.",
  "The universe contains more stars than there are grains of sand on every beach on Earth — roughly 10^24 stars."
];

  const [currentFact, setCurrentFact] = useState(null);

  const handlePlanetClick = () => {
    const random = facts[Math.floor(Math.random() * facts.length)];
    setCurrentFact(random);
  };

  useEffect(() => {
    const scene = sceneRef.current;
    const solar = solarRef.current;

    if (!scene || !solar) return;

    const orbits = [
      orbit1Ref.current, orbit2Ref.current, orbit3Ref.current,
      orbit4Ref.current, orbit5Ref.current, orbit6Ref.current,
      orbit7Ref.current, orbit8Ref.current
    ];

    let viewportHeight = window.innerHeight;

    const handleResize = () => {
      viewportHeight = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    let frameId = null;

    const updateOnScroll = () => {
      const rect = scene.getBoundingClientRect();

      const start = viewportHeight;
      const end = -viewportHeight;
      const current = rect.top;

      let progress = (start - current) / (start - end);
      progress = clamp(progress, 0, 1);

      const base = progress * 720; // 360° * 2

    
     const orbitSpeeds = [0.5, 0.7, 0.8, 1.35, 1.7, 1.5, 1.4, 1.2];
     orbits.forEach((orbit, index) => {
     orbit.style.transform = `rotate(${base * orbitSpeeds[index]}deg)`;
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
    };
  }, []);

  return (
    <div className="page">
      <section className="scene" ref={sceneRef}>
        <div className="hero-content">
          <h1>Museum of Useless Details</h1>
          <p>a snarky little archive stuffed with space facts for anyone who wants to feel tiny, confused, and slightly judged by the universe.</p>
        </div>

        <div className="hero-visual">
          <div className="solar-system" ref={solarRef}>
            <div className="sun"></div>

            <div className="orbit orbit1" ref={orbit1Ref}>
              <div className="planet planet1" onClick={handlePlanetClick}></div>
            </div>

            <div className="orbit orbit2" ref={orbit2Ref}>
              <div className="planet planet2" onClick={handlePlanetClick}></div>
            </div>

            <div className="orbit orbit3" ref={orbit3Ref}>
              <div className="planet planet3" onClick={handlePlanetClick}></div>
            </div>

            <div className="orbit orbit4" ref={orbit4Ref}>
              <div className="planet planet4" onClick={handlePlanetClick}></div>
            </div>

            <div className="orbit orbit5" ref={orbit5Ref}>
              <div className="planet planet5" onClick={handlePlanetClick}></div>
            </div>

            <div className="orbit orbit6" ref={orbit6Ref}>
              <div className="planet planet6" onClick={handlePlanetClick}></div>
            </div>

            <div className="orbit orbit7" ref={orbit7Ref}>
              <div className="planet planet7" onClick={handlePlanetClick}></div>
            </div>

            <div className="orbit orbit8" ref={orbit8Ref}>
              <div className="planet planet8" onClick={handlePlanetClick}></div>
            </div>
          </div>
        </div>
      </section>

      {currentFact && (
        <div className="fact-card">
          <button className="close-btn" onClick={() => setCurrentFact(null)}>×</button>
          <p>{currentFact}</p>
        </div>
      )}
    </div>
  );
}
