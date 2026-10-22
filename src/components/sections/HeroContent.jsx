import  { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { ArrowDown } from 'lucide-react'; // Importiamo la freccia
import { DATA } from "../../data/portfolioData";

export const HeroContent = () => {
  const taglineRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(taglineRef.current, {
      strings: DATA.tagline,
      typeSpeed: 35,
      backSpeed: 20,
      backDelay: 1800,
      loop: true,
      smartBackspace: true,
      showCursor: true,
      cursorChar: '❚',
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="hero-content">
      <div className="hero-rank">
        RANK: <strong>{DATA.status?.rank || "Junior"}</strong>
      </div>

      <h1 className="hero-name">{DATA.name}</h1>
      <div className="hero-title">{DATA.title}</div>

      <p className="hero-tagline">
        <span ref={taglineRef} />
      </p>

      {/* --- SCORRI PER CONTINUARE (RIPRISTINATO) --- */}
      <div className="hero-scroll">
        <ArrowDown size={14} />
        <span>SCORRI PER CONTINUARE</span>
      </div>
    </div>
  );
};