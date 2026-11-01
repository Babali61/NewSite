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
      { key: "links", label: "Liens", kind: "list" },
    ],
    component: NavBlock,
  },
  hero: {
    type: "hero",
    label: "Hero",
    schema: [
      { key: "title", label: "Titre", kind: "text" },
      { key: "subtitle", label: "Sous-titre", kind: "textarea" },
    ],
    component: HeroBlock,
  },
  text: {
    type: "text",
    label: "Texte",
    schema: [{ key: "body", label: "Contenu", kind: "textarea" }],
    component: TextBlock,
  },
};

export function getBlockDefinition(type: BlockType): BlockDefinition | undefined {
  return blockRegistry[type];
}

export function listBlockTypes(): BlockType[] {
  return Object.keys(blockRegistry) as BlockType[];
}
