import { getBlockDefinition } from "@newsite/blocks";
import type { PageDocument } from "@newsite/document";

type PageRendererProps = {
  document: PageDocument;
  selectedBlockId?: string | null;
  onSelectBlock?: (blockId: string) => void;
};

/**
 * Même renderer pour l’éditeur et le site public (preview ≈ live).
 */
export function PageRenderer({
  document,
  selectedBlockId = null,
  onSelectBlock,
}: PageRendererProps) {
  const selectable = typeof onSelectBlock === "function";

  return (
    <div className="ns-page">
      {document.blocks.map((block) => {
        const definition = getBlockDefinition(block.type);
        const isSelected = selectedBlockId === block.id;
        const className = [
          "ns-page__block",
          isSelected ? "ns-page__block--selected" : "",
          selectable ? "ns-page__block--selectable" : "",
        ]
          .filter(Boolean)
          .join(" ");

        const content = !definition ? (
          <div className="ns-block ns-block--unknown" data-block-type={block.type}>
            Bloc inconnu : {block.type}
          </div>
        ) : (
          (() => {
            const Component = definition.component;
            return <Component props={block.props} />;
          })()
        );

        if (!selectable) {
          return (
            <div key={block.id} data-block-id={block.id} data-block-type={block.type}>
              {content}
            </div>
          );
        }

        return (
          <div
            key={block.id}
            role="button"
            tabIndex={0}
            className={className}
            data-block-id={block.id}
            data-block-type={block.type}
            aria-pressed={isSelected}
            onClick={() => onSelectBlock(block.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelectBlock(block.id);
              }
            }}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
