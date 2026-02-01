export type WritingItem = {
  id: string;
  title: string;
  href: string;
  series?: string;
  platform?: "medium" | "external";
};

export const writing: WritingItem[] = [
  {
    id: "psc-a1",
    title: "Policy Before Tooling: Why Most Software Projects Are Ungovernable",
    href: "https://medium.com/@francescomaiomascio", // sostituisci col link diretto
    series: "PSC",
    platform: "medium",
  },
];
