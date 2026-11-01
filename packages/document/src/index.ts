/** Types du document page (JSON sérialisable) — stub v0. */

export type BlockType = "nav" | "hero" | "text" | "imageText" | "features" | "cta" | "footer";

export type BlockInstance = {
  id: string;
  type: BlockType;
  props: Record<string, unknown>;
};

export type PageDocument = {
  version: 1;
  blocks: BlockInstance[];
};

export function createEmptyDocument(): PageDocument {
  return { version: 1, blocks: [] };
}

export function createBlockId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `b-${crypto.randomUUID().slice(0, 8)}`;
  }
  return `b-${Date.now().toString(36)}`;
}

export function createBlock(type: BlockType, props: Record<string, unknown> = {}): BlockInstance {
  return {
    id: createBlockId(),
    type,
    props: { ...props },
  };
}

/** Document de démo pour le squelette éditeur. */
export function createDemoDocument(): PageDocument {
  return {
    version: 1,
    blocks: [
      {
        id: "b-nav",
        type: "nav",
        props: { brand: "Mon site", links: ["Accueil", "À propos"] },
      },
      {
        id: "b-hero",
        type: "hero",
        props: {
          title: "Bienvenue",
          subtitle: "Un site simple, sans code.",
        },
      },
      {
        id: "b-text",
        type: "text",
        props: {
          body: "Modifie ce texte, change les couleurs, puis publie une URL gratuite.",
        },
      },
    ],
  };
}

export function isPageDocument(value: unknown): value is PageDocument {
  if (!value || typeof value !== "object") return false;
  const doc = value as PageDocument;
  return doc.version === 1 && Array.isArray(doc.blocks);
}

export function reorderBlocks(
  blocks: BlockInstance[],
  activeId: string,
  overId: string,
): BlockInstance[] {
  const oldIndex = blocks.findIndex((block) => block.id === activeId);
  const newIndex = blocks.findIndex((block) => block.id === overId);
  if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) {
    return blocks;
  }

  const next = [...blocks];
  const [moved] = next.splice(oldIndex, 1);
  next.splice(newIndex, 0, moved);
  return next;
}
