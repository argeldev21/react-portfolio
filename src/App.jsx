import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { DATA, RANKS, SECTION_NAMES } from "./data/portfolioData";
import { RankNav } from "./components/navigation/RankNav";
import { HeroContent } from "./components/sections/HeroContent";
import StatusContent  from "./components/sections/StatusContent";
import SkillsContent from "./components/sections/SkillsContent";
import ProjectsContent from "./components/sections/ProjectsContent";
import ContactsContent  from "./components/sections/ContactsContent"; 

import "./styles/portfolio.css";


const CLOSE_MS = 380;
const OPEN_MS = 420;
const INERTIA_LOCK_MS = 250;

// Risale dal target fino alla root cercando un elemento con scroll verticale
// che possa ancora scorrere nella direzione indicata (1 = giù, -1 = su).
function findScrollable(el, dir, root) {
  while (el && el !== root && el.nodeType === 1) {
    const { overflowY } = window.getComputedStyle(el);
    if (/(auto|scroll)/.test(overflowY) && el.scrollHeight > el.clientHeight + 1) {
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      if ((dir > 0 && !atBottom) || (dir < 0 && !atTop)) return el;
    }
    el = el.parentElement;
  }
  return null;
}

export default function App() {
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState("idle"); 

  const pendingIndex = useRef(0);
  const closeTimer = useRef(null);
  const openTimer = useRef(null);
  const touchStartY = useRef(0);
  const touchCanScroll = useRef({ down: false, up: false });
  const lastNativeScroll = useRef(-1000);
  const stageRef = useRef(null);

  // Mappatura sezioni
  const sections = useMemo(
    () => [
      <HeroContent key="hero" data={DATA} />,
      <StatusContent key="status" data={DATA} />,
      <SkillsContent key="skills" skills={DATA.skills} />,
      <ProjectsContent key="quests" quests={DATA.quests} />,
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

  // Ogni nuova sezione parte dall'alto
  useEffect(() => {
    stageRef.current?.scrollTo(0, 0);
  }, [active]);

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
    const root = document.getElementById("sw-root");

    const onWheel = (e) => {
      const dir = e.deltaY > 0 ? 1 : -1;
      const big = Math.abs(e.deltaY) >= 4;

      // Se sotto il cursore c'è contenuto che può ancora scorrere, lascia fare al browser
      if (big && findScrollable(e.target, dir, root)) {
        lastNativeScroll.current = performance.now();
        return;
      }

      e.preventDefault();
      if (phase !== "idle" || !big) return;

      // Evita che l'inerzia del trackpad, a fine scroll interno, cambi sezione per sbaglio
      const now = performance.now();
      if (now - lastNativeScroll.current < INERTIA_LOCK_MS) {
        lastNativeScroll.current = now;
        return;
      }
      trigger(dir);
    };

    const onKey = (e) => {
      const t = e.target;
      if (t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;

      const down = ["ArrowDown", "PageDown"].includes(e.key);
      const up = ["ArrowUp", "PageUp"].includes(e.key);
      if (!down && !up) return;

      e.preventDefault();
      const dir = down ? 1 : -1;
      const stage = stageRef.current;

      // Se la sezione è più alta dello schermo, prima scorri, poi cambia sezione
      if (stage && findScrollable(stage, dir, root)) {
        const step = e.key.startsWith("Page") ? stage.clientHeight * 0.9 : 80;
        stage.scrollBy({ top: dir * step });
        lastNativeScroll.current = performance.now();
        return;
      }
      trigger(dir);
    };

    const onTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
      touchCanScroll.current = {
        down: !!findScrollable(e.target, 1, root),
        up: !!findScrollable(e.target, -1, root),
      };
    };

    const onTouchEnd = (e) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 30) return;
      const dir = delta > 0 ? 1 : -1;
      // Se il gesto stava scorrendo del contenuto, non cambiare sezione
      if (dir > 0 ? touchCanScroll.current.down : touchCanScroll.current.up) return;
      trigger(dir);
    };

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
      <RankNav ranks={RANKS} names={SECTION_NAMES} active={active} goTo={goTo} />

      {/* Stage centrale */}
      <div className="sw-stage" ref={stageRef}>
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