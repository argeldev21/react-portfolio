import {
  Code2,
  Server,
  Palette,
  Gauge,
  ShieldCheck,
} from "lucide-react";

// Importa le icone social dal tuo file dedicato Icons.jsx
import { GithubIcon, LinkedinIcon } from "../components/ui/Icons";

export const RANKS = ["", "", "", "", ""];
export const CLOSE_MS = 380;
export const OPEN_MS = 420;

export const DATA = {
  name: "Argel Allan Dela Cruz",
  title: "Cloud / Web Developer",
  tagline: [
    "Costruisco interfacce che si comportano come dovrebbero: veloci, chiare, senza fronzoli (forse).",
    "Costruisco interfacce che si comportano come dovrebbero: veloci, chiare, senza fronzoli.",
    "Scrivo codice pulito e ordinato. O almeno così dice il linter.",
    "Scrivo codice pulito e ordinato.",
    "Risolvo problemi complessi con soluzioni semplici (tranne quando basta riavviare).",
    "Risolvo problemi complessi con soluzioni semplici.",
    "Sviluppo prodotti digitali dal design al deploy. Senza far esplodere nulla di venerdì.",
    "Sviluppo prodotti digitali dal design al deploy.",
  ],
  location: "Roma, IT",

  status: {
    rank: "Junior",
    level: 10,
    availability: "Open to work",
    bio: "Sviluppo prodotti digitali da capo a fondo: dal design system al deploy. Mi piace il codice che si legge come una frase ben scritta.",
    stats: [
      { key: "STR", label: "Frontend", value: 55, icon: Code2 },
      { key: "INT", label: "Backend", value: 50, icon: Server },
      { key: "SENS", label: "UI / UX", value: 45, icon: Palette },
      { key: "AGI", label: "Performance", value: 61, icon: Gauge },
      { key: "VIT", label: "Affidabilità", value: 59, icon: ShieldCheck },
    ],
  },

  skills: [
    {
      group: "Frontend",
      items: [
        { name: "React", lvl: "MAX" },
        { name: "TypeScript", lvl: "MAX" },
        { name: "Next.js", lvl: "LV.8" },
        { name: "Tailwind CSS", lvl: "LV.9" },
      ],
    },
    {
      group: "Backend",
      items: [
        { name: "Node.js", lvl: "LV.8" },
        { name: "PostgreSQL", lvl: "LV.7" },
        { name: "GraphQL", lvl: "LV.6" },
        { name: "Docker", lvl: "LV.6" },
      ],
    },
    {
      group: "Strumenti",
      items: [
        { name: "Git", lvl: "MAX" },
        { name: "Figma", lvl: "LV.7" },
        { name: "CI / CD", lvl: "LV.6" },
        { name: "Vitest", lvl: "LV.7" },
      ],
    },
  ],

  quests: [ ],

  contact: {
    heading: "Richiesta di alleanza",
    body: "Hai un progetto in mente o cerchi un developer per il tuo party? Mandami un segnale.",
    email: "tuonome@email.com",
    socials: [
      { label: "GitHub", icon: GithubIcon, href: "https://github.com/tuonome" },
      { label: "LinkedIn", icon: LinkedinIcon, href: "https://linkedin.com/in/tuonome" },
    ],
  },
};