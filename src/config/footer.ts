export type FooterLocale = "en" | "it";

export type FooterLocalized = Record<FooterLocale, string>;

export type FooterLinkItem = {
  id: string;
  label: FooterLocalized;
  href: string;
  external?: boolean;
};

export type FooterCta = FooterLinkItem & {
  variant: "primary" | "secondary";
};

export type FooterSocial = {
  id: "github" | "x" | "linkedin" | "medium";
  label: string;
  href: string;
};

export type FooterColumn = {
  id: string;
  title: FooterLocalized;
  items: FooterLinkItem[];
};

export const FOOTER_LANGUAGE_KEY = "yai.footer.locale";

export const FOOTER_LOCALES: Array<{ value: FooterLocale; label: FooterLocalized }> = [
  { value: "en", label: { en: "English", it: "Inglese" } },
  { value: "it", label: { en: "Italian", it: "Italiano" } },
];

export const FOOTER_COPY = {
  getStartedTitle: {
    en: "Get started",
    it: "Inizia ora",
  },
  getStartedSub: {
    en: "Talk with a YAI expert and design governed execution for production systems.",
    it: "Parla con un esperto YAI e progetta execution governed per sistemi in produzione.",
  },
  brandLabel: {
    en: "YAI Labs home",
    it: "Home YAI Labs",
  },
  socialLabel: {
    en: "Social",
    it: "Social",
  },
  columnsLabel: {
    en: "Footer links",
    it: "Link footer",
  },
  legalLabel: {
    en: "Legal links",
    it: "Link legali",
  },
  languageLabel: {
    en: "Language",
    it: "Lingua",
  },
} satisfies Record<string, FooterLocalized>;

export const FOOTER_CTA: FooterCta[] = [
  {
    id: "try-yai",
    label: { en: "Try YAI", it: "Prova YAI" },
    href: "/#products",
    variant: "primary",
  },
  {
    id: "book-pilot",
    label: { en: "Book pilot", it: "Prenota pilot" },
    href: "mailto:pilot@yai.foundation?subject=Book%20Pilot%20-%20YAI%2014-Day",
    variant: "secondary",
  },
];

export const FOOTER_SOCIALS: FooterSocial[] = [
  { id: "github", label: "GitHub", href: "https://github.com/framaiomascio" },
  { id: "x", label: "X", href: "https://x.com/framaiomascio" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/" },
  { id: "medium", label: "Medium", href: "https://medium.com/" },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    id: "use-cases",
    title: { en: "Use cases", it: "Use cases" },
    items: [
      { id: "vector-db", label: { en: "Vector database", it: "Vector database" }, href: "/#domains" },
      { id: "feature-stores", label: { en: "Feature stores", it: "Feature stores" }, href: "/#domains" },
      { id: "semantic-cache", label: { en: "Semantic cache", it: "Semantic cache" }, href: "/#domains" },
      { id: "caching", label: { en: "Caching", it: "Caching" }, href: "/#domains" },
      { id: "nosql", label: { en: "NoSQL database", it: "NoSQL database" }, href: "/#domains" },
      { id: "leaderboards", label: { en: "Leaderboards", it: "Leaderboards" }, href: "/#domains" },
      { id: "dedup", label: { en: "Data deduplication", it: "Data deduplication" }, href: "/#domains" },
      { id: "messaging", label: { en: "Messaging", it: "Messaging" }, href: "/#domains" },
      { id: "auth-token", label: { en: "Authentication token storage", it: "Authentication token storage" }, href: "/#domains" },
      { id: "fast-ingest", label: { en: "Fast data ingest", it: "Fast data ingest" }, href: "/#domains" },
      { id: "query-cache", label: { en: "Query caching", it: "Query caching" }, href: "/#domains" },
      { id: "query-engine", label: { en: "Redis Query Engine", it: "Redis Query Engine" }, href: "/#domains" },
      { id: "all-solutions", label: { en: "All solutions", it: "All solutions" }, href: "/domains" },
    ],
  },
  {
    id: "industries",
    title: { en: "Industries", it: "Industrie" },
    items: [
      { id: "finance", label: { en: "Financial services", it: "Servizi finanziari" }, href: "/#domains" },
      { id: "manufacturing", label: { en: "Manufacturing", it: "Manufacturing" }, href: "/#domains" },
      { id: "healthcare", label: { en: "Healthcare", it: "Healthcare" }, href: "/#domains" },
      { id: "all-industries", label: { en: "All industries", it: "Tutte le industrie" }, href: "/domains" },
    ],
  },
  {
    id: "company",
    title: { en: "Company", it: "Azienda" },
    items: [
      { id: "writing", label: { en: "Writing", it: "Articoli" }, href: "/writing" },
      { id: "status", label: { en: "Status", it: "Stato" }, href: "/status" },
      {
        id: "opensource",
        label: { en: "Open source", it: "Open source" },
        href: "https://github.com/yai-labs",
        external: true,
      },
    ],
  },
  {
    id: "compare",
    title: { en: "Compare", it: "Confronta" },
    items: [
      { id: "vs-agents", label: { en: "YAI vs. Agents", it: "YAI vs. Agents" }, href: "/writing" },
      { id: "vs-ai-apps", label: { en: "YAI vs. AI apps", it: "YAI vs. AI apps" }, href: "/writing" },
      { id: "vs-workflow", label: { en: "YAI vs. Workflow tools", it: "YAI vs. Workflow tools" }, href: "/writing" },
    ],
  },
  {
    id: "connect",
    title: { en: "Connect", it: "Connect" },
    items: [
      {
        id: "community",
        label: { en: "Community", it: "Community" },
        href: "https://github.com/yai-labs",
        external: true,
      },
      { id: "events", label: { en: "Events & webinars", it: "Eventi e webinar" }, href: "/writing" },
      {
        id: "x-social",
        label: { en: "X", it: "X" },
        href: "https://x.com/framaiomascio",
        external: true,
      },
    ],
  },
  {
    id: "partners",
    title: { en: "Partners", it: "Partner" },
    items: [
      { id: "cloud", label: { en: "Cloud", it: "Cloud" }, href: "/#services" },
      { id: "security", label: { en: "Security", it: "Sicurezza" }, href: "/security" },
      { id: "all-partners", label: { en: "All partners", it: "Tutti i partner" }, href: "/#services" },
    ],
  },
  {
    id: "support",
    title: { en: "Support", it: "Supporto" },
    items: [
      { id: "docs", label: { en: "Docs", it: "Docs" }, href: "/docs" },
      { id: "contact", label: { en: "Contact", it: "Contatti" }, href: "mailto:pilot@yai.foundation" },
      { id: "connect", label: { en: "Connect", it: "Connect" }, href: "https://www.linkedin.com/", external: true },
    ],
  },
];

export const FOOTER_LEGAL_LINKS: FooterLinkItem[] = [
  { id: "trust", label: { en: "Trust", it: "Trust" }, href: "/status" },
  { id: "privacy", label: { en: "Privacy", it: "Privacy" }, href: "/privacy" },
  { id: "terms", label: { en: "Terms of use", it: "Termini d'uso" }, href: "/terms" },
  { id: "legal", label: { en: "Legal notices", it: "Note legali" }, href: "/legal" },
];
