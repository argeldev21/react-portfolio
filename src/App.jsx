import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { DATA, RANKS } from "./data/portfolioData";
import { RankNav } from "./components/navigation/RankNav";
import { HeroContent } from "./components/sections/HeroContent";
import StatusContent  from "./components/sections/StatusContent";
import SkillsContent from "./components/sections/SkillsContent";
import ContactsContent  from "./components/sections/ContactsContent"; 

import "./styles/portfolio.css";


const CLOSE_MS = 380;
const OPEN_MS = 420;

export default function App() {
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState("idle"); 

  const pendingIndex = useRef(0);
  const closeTimer = useRef(null);
  const openTimer = useRef(null);
  const touchStartY = useRef(0);

  // Mappatura sezioni
  const sections = useMemo(
    () => [
      <HeroContent key="hero" data={DATA} />,
      <StatusContent key="status" data={DATA} />,
      <SkillsContent key="skills" skills={DATA.skills} />,
      <SkillsContent key="quests" quests={DATA.quests} />,
      <ContactsContent key="contact" contact={DATA.contact} />,
    ],
    []
  );

  const sectionCount = sections.length;

  // Cleanup dei timer SOLO quando il componente viene smontato (senza interferire con lo scroll)
  useEffect(() => {
    return () => {
      clearTimeout(closeTimer.current);
      clearTimeout(openTimer.current);
    };
  }, []);

  // Funzione centralizzata per il cambio sezione
  const changeSection = useCallback(
    (targetIndex) => {
      if (phase !== "idle") return;

      const clamped = Math.max(0, Math.min(sectionCount - 1, targetIndex));
      if (clamped === active) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setActive(clamped);
        return;
      }

      pendingIndex.current = clamped;

      setPhase("closing");
      closeTimer.current = setTimeout(() => {
        setActive(pendingIndex.current);
        setPhase("opening");
        openTimer.current = setTimeout(() => {
          setPhase("idle");
        }, OPEN_MS);
      }, CLOSE_MS);
    },
    [active, phase, sectionCount]
  );

  const trigger = useCallback(
    (direction) => {
      changeSection(active + direction);
    },
    [active, changeSection]
  );

  const goTo = useCallback(
    (index) => {
      changeSection(index);
    },
    [changeSection]
  );

  // Event Listeners (Mouse, Tastiera, Touch)
  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      if (phase !== "idle" || Math.abs(e.deltaY) < 4) return;
      trigger(e.deltaY > 0 ? 1 : -1);
    };

    const onKey = (e) => {
      if (["ArrowDown", "PageDown"].includes(e.key)) {
        e.preventDefault();
        trigger(1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        trigger(-1);
      }
    };

    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 30) return;
      trigger(delta > 0 ? 1 : -1);
    };

    const root = document.getElementById("sw-root");
    root?.addEventListener("wheel", onWheel, { passive: false });
    root?.addEventListener("touchstart", onTouchStart, { passive: true });
    root?.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      root?.removeEventListener("wheel", onWheel);
      root?.removeEventListener("touchstart", onTouchStart);
      root?.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [phase, trigger]);

  const shutterClass =
    phase === "closing" ? "closing" : phase === "opening" ? "opening" : "";

  return (
    <div id="sw-root" className="sw-root">
      <div className="sw-bg" />

      {/* Navigazione per Rank */}
      <RankNav ranks={RANKS} active={active} goTo={goTo} />

      {/* Stage centrale */}
      <div className="sw-stage">
        <div className="sw-shutter">
          {phase !== "idle" && (
            <>
              <span
                key={`edge-top-${active}-${phase}`}
                className={`sw-edge sw-edge-top ${shutterClass}`}
              />
              <span
                key={`edge-bottom-${active}-${phase}`}
                className={`sw-edge sw-edge-bottom ${shutterClass}`}
              />
            </>
          )}
          <div
            key={`${active}-${phase}`}
            className={`sw-shutter-clip ${shutterClass}`}
          >
            {sections[active]}
          </div>
        </div>
      </div>
    </div>
  );
}