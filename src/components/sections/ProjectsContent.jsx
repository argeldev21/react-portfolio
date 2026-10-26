import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { ExternalLink } from "lucide-react";
import SystemFrame from "../ui/SystemFrame";
import { DATA } from "../../data/portfolioData";

export default function ProjectsContent() {
  const quests = DATA.quests;
  const isEmpty = quests.length === 0;
  const wipRef = useRef(null);

  useEffect(() => {
    if (!isEmpty || !wipRef.current) return;

    const typed = new Typed(wipRef.current, {
      // ^400 = pausa di 400ms prima di ogni puntino
      strings: ["^500.^500.^500."],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1500,
      loop: true,
      smartBackspace: true,
      showCursor: false,
      
    });

    return () => typed.destroy();
  }, [isEmpty]);

  return (
    <SystemFrame eyebrow="Projects">
      {isEmpty ? (
        <div className="quest-empty">
          Work in Progress<span ref={wipRef} className="quest-empty-title" />
        </div>
      ) : (
        <div className="quest-list">
          {quests.map((q) => (
            <div className="quest-card" key={q.title}>
              <div className="quest-top">
                <div>
                  <span className="quest-rank">RANK {q.rank}</span>
                  <div className="quest-title" style={{ marginTop: 6 }}>{q.title}</div>
                </div>
                <span className="quest-status">{q.status}</span>
              </div>
              <p className="quest-desc">{q.desc}</p>
              <div className="quest-bottom">
                <div className="quest-reward">
                  {q.reward.map((r) => <span key={r}>{r}</span>)}
                </div>
                {q.link && (
                  <a className="quest-link" href={q.link} target="_blank" rel="noreferrer">
                    Vedi progetto <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </SystemFrame>
  );
}