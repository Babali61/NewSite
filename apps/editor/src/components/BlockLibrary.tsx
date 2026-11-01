import { getBlockDefinition, listBlockTypes } from "@newsite/blocks";
import type { BlockType } from "@newsite/document";

type BlockLibraryProps = {
  onAddBlock: (type: BlockType) => void;
};

export function BlockLibrary({ onAddBlock }: BlockLibraryProps) {
  const types = listBlockTypes();

  return (
    <aside className="editor-panel editor-panel--left" aria-label="Bibliothèque de blocs">
      <h2>Blocs</h2>
      <p>Ajoute une section à ta page.</p>
      <ul className="block-library">
        {types.map((type) => {
          const definition = getBlockDefinition(type);
          if (!definition) return null;
          return (
            <li key={type}>
              <button type="button" className="block-library__btn" onClick={() => onAddBlock(type)}>
                {definition.label}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
