export type FocusItem = {
  title: string;
  description: string;
  highlights?: string[];
};

export const currentFocus: FocusItem[] = [
  {
    title: "Governable software systems",
    description: "Identity, authority, traceability — policy-first systems thinking applied to real repos.",
    highlights: ["ICE", "PSC standards", "Public proof surfaces"],
  },
];
