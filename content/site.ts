/**
 * Profile data, transcribed from Momen's resume. This is the single source
 * of truth for every route.
 *
 * Content integrity rules for this file:
 * - Nothing here is invented. Fields the resume itself left blank — phone
 *   number, LinkedIn, the telemarketing employer's name — are omitted
 *   rather than filled with a placeholder, and components render around
 *   their absence.
 * - No testimonials, client logos, press or usage metrics exist yet, so
 *   there are no fields for them. When real ones exist, they get added
 *   here; until then those sections simply don't render.
 * - `stats` are facts already stated elsewhere in this file (dates on the
 *   ERP role, the diploma's and course's stated hours, the certified English level) —
 *   not fresh claims.
 */

export type SocialLink = {
  label: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type ExperienceEntry = {
  role: string;
  /** Absent where the resume didn't name the employer. */
  company?: string;
  location?: string;
  /** Shown under the role, e.g. a qualification the role depended on. */
  subtitle?: string;
  start: string;
  end: string;
  bullets: string[];
};

export type EducationEntry = {
  credential: string;
  institution: string;
  location?: string;
  date: string;
  detail?: string;
};

export type CertificationEntry = {
  title: string;
  issuer: string;
  date: string;
  detail?: string;
};

export type SkillLevel = {
  label: string;
  /** 0-100, drives the bar width only. */
  value: number;
};

export type SkillGroup = {
  category: string;
  items: string[];
  /**
   * Rough self-assessment, ordered by what the resume evidences: years of
   * paid hands-on work outrank a recently completed short course. Omitted
   * for spoken languages, where fluency is per-language, not per-category.
   */
  level?: SkillLevel;
};

export type Site = {
  name: string;
  fullName: string;
  role: string;
  anchorLine: string;
  location: string;
  email: string;
  socials: SocialLink[];
  summary: string;
  stats: Stat[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  certifications: CertificationEntry[];
  skills: SkillGroup[];
};

export const site: Site = {
  name: "Momen Ahmed",
  fullName: "Momen Ahmed Abdelmajeed Ahmed",
  role: "Mobile Application Developer & Systems Analyst",

  anchorLine:
    "I build cross-platform apps in Flutter, and I write the requirements that ERP systems get built from. Most of my work is turning what a business actually needs into something a system — or an app — can execute.",

  location: "Sudan / Egypt",
  email: "momen.sulieman9@gmail.com",

  // No verified profile URLs yet. The header, footer and contact page all
  // render conditionally on this being non-empty.
  socials: [],

  summary:
    "Software developer and systems analyst with a Computer Science background and hands-on experience across ERP systems analysis, requirements engineering, and cross-platform mobile development with Flutter and Dart. I spent three years translating business needs into specifications other people built from; I'm now building the thing myself.",

  stats: [
    { value: "3+ yrs", label: "ERP requirements engineering" },
    { value: "Telemarketer", label: "English Level B2" },
    { value: "120 hrs", label: "Flutter development diploma" },
    { value: "40 hrs", label: "UI/UX design course" },
  ],

  experience: [
    {
      role: "System Analyst & Requirements Engineer",
      company: "Raiba Trans – Elnefeidi Group",
      location: "Sudan",
      start: "June 2022",
      end: "August 2025",
      bullets: [
        "Analyzed, designed, and managed system requirements for three core ERP modules: Workshop, Tiers, and Inventory.",
        "Worked directly with stakeholders to gather business logic, define functional specifications, and streamline operational workflows.",
        "Sat between the technical team and the business units, keeping deployments smooth and downtime minimal.",
      ],
    },
    {
      // The resume didn't name this employer, so neither does the site.
      role: "Telemarketer",
      subtitle: "English Level B2",
      start: "September 2025",
      end: "November 2025",
      bullets: [
        "Handled client communication in English, holding a professional standard of service across calls.",
        "Used B2-level English to pitch services, negotiate, and resolve client questions.",
      ],
    },
  ],

  education: [
    {
      credential: "B.Sc. (Honours), Computer Science",
      institution: "Faculty of Computer Science, The University of Future",
      location: "Sudan",
      date: "Graduated April 2022",
      detail: "Second Class, Division One",
    },
  ],

  certifications: [
    {
      title: "Flutter Development Diploma (120 hours)",
      issuer: "Easy Learn Academy",
      date: "Jan 2026 – May 2026",
      detail:
        "Dart and OOP, Flutter widgets and theming, responsive UI, local storage, REST APIs, Firebase and Supabase, notifications, maps and location, payment integration, and publishing to Google Play.",
    },
    {
      title: "UI/UX Design Course (40 hours)",
      issuer: "ILC Soft Training / ILearn Code Academy",
      date: "2026",
      detail: "Interface design principles, UX workflow, and modern design tooling.",
    },
  ],

  skills: [
    {
      category: "Mobile Development",
      items: [
        "Flutter",
        "Dart",
        "Cross-platform apps",
        "State management",
        "RESTful APIs",
        "Firebase",
        "Supabase",
        "Local storage",
        "Google Maps",
        "Payment integration",
      ],
      level: { label: "Intermediate", value: 65 },
    },
    {
      category: "Systems & Analysis",
      items: [
        "ERP systems",
        "Requirements engineering",
        "Business analysis",
        "Process mapping",
        "Stakeholder communication",
      ],
      level: { label: "Advanced", value: 90 },
    },
    {
      category: "UI/UX & Design",
      items: ["Interface design principles", "Wireframing", "UX workflows"],
      level: { label: "Foundational", value: 45 },
    },
    {
      category: "Programming Languages",
      items: ["Dart", "C++", "Java"],
      level: { label: "Foundational", value: 40 },
    },
    {
      category: "Languages",
      items: ["Arabic (Native)", "English (B2, Professional Working Proficiency)"],
    },
  ],
};
