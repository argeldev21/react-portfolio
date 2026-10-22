
import { Mail, Swords } from "lucide-react";
import  SystemFrame  from "../ui/SystemFrame";
import { DATA } from "../../data/portfolioData";

export default function ContactContent() {
  return (
    <SystemFrame eyebrow="Guild recruitment · rank S">
      <div className="contact-wrap">
        <Swords size={22} color="var(--violet)" style={{ marginBottom: 14 }} />
        <h2>{DATA.contact.heading}</h2>
        <p>{DATA.contact.body}</p>
        <a className="contact-btn" href={`mailto:${DATA.contact.email}`}>
          <Mail size={16} /> Invia richiesta
        </a>
        <div className="contact-socials">
          {DATA.contact.socials.map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer">
              <s.icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </SystemFrame>
  );
}