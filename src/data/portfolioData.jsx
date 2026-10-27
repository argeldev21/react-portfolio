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
// Nomi univoci delle sezioni: usati come key e per le etichette di accessibilità della nav.
export const SECTION_NAMES = ["Home", "Status", "Competenze", "Progetti", "Contatti"];
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
        { name: "HTML / CSS", lvl: "LV.6" },
        { name: "JavaScript", lvl: "LV.6" },
        { name: "Vue.js", lvl: "LV.5" },
        { name: "Angular", lvl: "LV.4" },
        { name: "React", lvl: "LV.5" },
        { name: "Flutter", lvl: "LV.3" },
      ],
    },
    {
      group: "Backend",
      items: [
        { name: "Java / Spring Boot", lvl: "LV.4" },
        { name: "C# / .NET", lvl: "LV.5" },
        { name: "PHP / Laravel", lvl: "LV.5" },
        { name: "REST API", lvl: "LV.5" },
      ],
    },
    {
      group: "Database",
      items: [
        { name: "PostgreSQL", lvl: "LV.4" },
        { name: "MongoDB", lvl: "LV.3" },
        { name: "MySQL", lvl: "LV.5" },
        { name: "SQL Server", lvl: "LV.4" },
      ],
    },
    {
      group: "Cloud & Tools",
      items: [
        { name: "AWS", lvl: "LV.3" },
        { name: "Docker", lvl: "LV.3" },
        { name: "Git", lvl: "LV.5" },
        { name: "Linux", lvl: "LV.4" },
      ],
    },
  ],

  quests: [],

  contact: {
  heading: "Lavoriamo insieme",
  body: "Sono un Junior Cloud / Web Developer aperto a nuove opportunità. Se hai un progetto o cerchi una risorsa per il tuo team, scrivimi: sarò felice di confrontarmi con te.",
  email: "argeldelacruz86@gmail.com",
  socials: [
    { label: "GitHub", icon: GithubIcon, href: "https://github.com/argeldev21" },
    { label: "LinkedIn", icon: LinkedinIcon, href: "" },
  ],
},
};
