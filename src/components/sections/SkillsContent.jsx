
import  SystemFrame  from "../ui/SystemFrame";
import { DATA } from "../../data/portfolioData";

export default function SkillsContent() {
  return (
    <SystemFrame eyebrow="Skill tree">
      <div className="skills-groups">
        {DATA.skills.map((g) => (
          <div key={g.group}>
            <div className="skill-group-title">{g.group}</div>
            <div className="skill-nodes">
              {g.items.map((it) => (
                <div className="skill-node" key={it.name}>
                  <span>{it.name}</span>
                  <span>{it.lvl}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SystemFrame>
  );
}