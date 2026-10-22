
import { ExternalLink } from "lucide-react";
import  SystemFrame  from "../ui/SystemFrame";
import { DATA } from "../../data/portfolioData";

export default function QuestsContent() {
  return (
    <SystemFrame eyebrow="Quest log">
      <div className="quest-list">
        {DATA.quests.map((q) => (
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
              <a className="quest-link" href={q.link}>
                Vedi progetto <ExternalLink size={13} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </SystemFrame>
  );
}