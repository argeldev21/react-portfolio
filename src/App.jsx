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

// In modalità mobile si cambia sezione con lo swipe orizzontale (destra = avanti)
const MOBILE_QUERY = "(max-width: 640px)";
const SWIPE_MIN_PX = 40;

// Risale dal target fino alla root cercando un elemento che possa ancora scorrere
// nella direzione indicata (1 = giù/destra, -1 = su/sinistra) sull'asse richiesto.
function findScrollable(el, dir, root, axis = "y") {
  const horizontal = axis === "x";
  while (el && el !== root && el.nodeType === 1) {
    const style = window.getComputedStyle(el);
    const overflow = horizontal ? style.overflowX : style.overflowY;
    const size = horizontal ? el.scrollWidth : el.scrollHeight;
    const client = horizontal ? el.clientWidth : el.clientHeight;
    if (/(auto|scroll)/.test(overflow) && size > client + 1) {
      const pos = horizontal ? el.scrollLeft : el.scrollTop;
      const atStart = pos <= 0;
      const atEnd = pos + client >= size - 1;
      if ((dir > 0 && !atEnd) || (dir < 0 && !atStart)) return el;
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
  const touchStart = useRef({ x: 0, y: 0 });
  const touchCanScroll = useRef({ down: false, up: false, right: false, left: false });
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

      // Se la sezione contiene una lista scorrevole (es. skill), scorri prima quella
      const inner = stage?.querySelector(".skills-groups");
      if (inner && findScrollable(inner, dir, root)) {
        const step = e.key.startsWith("Page") ? inner.clientHeight * 0.9 : 80;
        inner.scrollBy({ top: dir * step });
        lastNativeScroll.current = performance.now();
        return;
      }

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
      const touch = e.touches[0];
      touchStart.current = { x: touch.clientX, y: touch.clientY };
      touchCanScroll.current = {
        down: !!findScrollable(e.target, 1, root),
        up: !!findScrollable(e.target, -1, root),
        right: !!findScrollable(e.target, 1, root, "x"),
        left: !!findScrollable(e.target, -1, root, "x"),
      };
    };

    const onTouchEnd = (e) => {
      const touch = e.changedTouches[0];
      const dx = touchStart.current.x - touch.clientX;
      const dy = touchStart.current.y - touch.clientY;
      const can = touchCanScroll.current;

      // Mobile: swipe orizzontale (verso sinistra = sezione successiva)
      if (window.matchMedia(MOBILE_QUERY).matches) {
        if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy) * 1.2) return;
        const dir = dx > 0 ? 1 : -1;
        // Se il gesto stava scorrendo un carosello, non cambiare sezione
        if (dir > 0 ? can.right : can.left) return;
        trigger(dir);
        return;
      }

      // Desktop / tablet: swipe verticale come prima
      if (Math.abs(dy) < 30) return;
      const dir = dy > 0 ? 1 : -1;
      if (dir > 0 ? can.down : can.up) return;
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