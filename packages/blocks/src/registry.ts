import type { BlockType } from "@newsite/document";
import { HeroBlock } from "./hero/HeroBlock";
import { NavBlock } from "./nav/NavBlock";
import { TextBlock } from "./text/TextBlock";
import type { BlockDefinition } from "./types";

/** Registre des blocs v0 (3 stubs pour démarrer). */
export const blockRegistry: Partial<Record<BlockType, BlockDefinition>> = {
  nav: {
    type: "nav",
    label: "En-tête / navigation",
    schema: [
      { key: "brand", label: "Nom du site", kind: "text" },
      { key: "links", label: "Liens (séparés par des virgules)", kind: "list" },
    ],
    defaultProps: { brand: "Mon site", links: ["Accueil", "À propos"] },
    component: NavBlock,
  },
  hero: {
    type: "hero",
    label: "Hero",
    schema: [
      { key: "title", label: "Titre", kind: "text" },
      { key: "subtitle", label: "Sous-titre", kind: "textarea" },
    ],
    defaultProps: {
      title: "Bienvenue",
      subtitle: "Un site simple, sans code.",
    },
    component: HeroBlock,
  },
  text: {
    type: "text",
    label: "Texte",
    schema: [{ key: "body", label: "Contenu", kind: "textarea" }],
    defaultProps: {
      body: "Modifie ce texte, change les couleurs, puis publie une URL gratuite.",
    },
    component: TextBlock,
  },
};

export function getBlockDefinition(type: BlockType): BlockDefinition | undefined {
  return blockRegistry[type];
}

export function listBlockTypes(): BlockType[] {
  return Object.keys(blockRegistry) as BlockType[];
}
