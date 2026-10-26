
import { Mail, Send } from "lucide-react";
import  SystemFrame  from "../ui/SystemFrame";
import { DATA } from "../../data/portfolioData";

export default function ContactsContent() {
  return (
    <SystemFrame eyebrow="Contatti">
      <div className="contact-wrap">
        <Mail size={22} color="var(--violet)" style={{ marginBottom: 14 }} />
        <h2>{DATA.contact.heading}</h2>
        <p>{DATA.contact.body}</p>
        {DATA.contact.email && (
          <a className="contact-btn" href={`mailto:${DATA.contact.email}`}>
            <Send size={16} /> Invia richiesta
          </a>
        )}
        <div className="contact-socials">
          {DATA.contact.socials.filter((s) => s.href).map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer">
              <s.icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </SystemFrame>
  );
}