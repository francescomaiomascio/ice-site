export type ExternalLink = {
  id: string;
  label: string;
  href: string;
};

export const links = {
  github: { id: "github", label: "GitHub", href: "https://github.com/francescomaiomascio" },
  medium: { id: "medium", label: "Medium", href: "https://medium.com/@francescomaiomascio" },
  linkedin: { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/francesco-maiomascio/" },
  gumroad: { id: "gumroad", label: "Gumroad", href: "https://maiomascio.gumroad.com" }, // aggiorna se diverso
} as const;

export const primaryLinks: ExternalLink[] = Object.values(links);
