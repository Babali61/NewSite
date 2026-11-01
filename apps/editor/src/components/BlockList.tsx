import type { BlockInstance } from "@newsite/document";

type BlockListProps = {
  blocks: BlockInstance[];
};

/**
 * Liste ordonnée de blocs — point d’ancrage pour @dnd-kit Sortable plus tard.
 * Chaque item a un id stable (requis par dnd-kit).
 */
export function BlockList({ blocks }: BlockListProps) {
  return (
    <ul className="block-list" data-dnd-ready="true" aria-label="Ordre des blocs">
      {blocks.map((block, index) => (
        <li key={block.id} className="block-list__item" data-block-id={block.id}>
          <span className="block-list__index">{index + 1}</span>
          <span className="block-list__type">{block.type}</span>
          <span className="block-list__id">{block.id}</span>
        </li>
      ))}
    </ul>
  );
}
