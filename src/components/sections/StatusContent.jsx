
import  SystemFrame  from "../ui/SystemFrame";
import  StatBar  from "../ui/StatBar";
import { DATA } from "../../data/portfolioData";

export default function StatusContent() {
  return (
    <SystemFrame eyebrow="Status window">
      <div className="status-grid">
        <div className="status-top">
          <h2>{DATA.name}</h2>
          <span className="status-lv">LV. {DATA.status.level}</span>
        </div>
        <div className="status-meta">
          <span><b>Rank</b> · {DATA.status.rank}</span>
          <span><b>Classe</b> · {DATA.title}</span>
          <span><b>Disponibilità</b> · {DATA.status.availability}</span>
          <span><b>Sede</b> · {DATA.location}</span>
        </div>
        <p className="status-bio">{DATA.status.bio}</p>
        <div>
          {DATA.status.stats.map((s) => (
            <StatBar key={s.key} icon={s.icon} label={s.label} value={s.value} />
          ))}
        </div>
      </div>
    </SystemFrame>
  );
}