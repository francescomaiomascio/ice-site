export type Project = {
  id: string;
  name: string;
  description: string;
  href?: string;
  status?: "active" | "draft" | "planned";
  tags?: string[];
};

export const projects: Project[] = [
  {
    id: "ice",
    name: "ICE",
    description: "Modular ecosystem for governable software execution and governance surfaces.",
    href: "https://github.com/francescomaiomascio?tab=repositories",
    status: "active",
    tags: ["runtime", "governance", "identity"],
  },
  {
    id: "psc",
    name: "Project Standard Core (PSC)",
    description: "Policy-first standards and templates for governable projects.",
    href: "https://github.com/francescomaiomascio",
    status: "active",
    tags: ["standards", "governance", "templates"],
  },
];
