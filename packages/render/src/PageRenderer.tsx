import { getBlockDefinition } from "@newsite/blocks";
import type { PageDocument } from "@newsite/document";

type PageRendererProps = {
  document: PageDocument;
};

/**
 * Même renderer pour l’éditeur et le site public (preview ≈ live).
 */
export function PageRenderer({ document }: PageRendererProps) {
  return (
    <div className="ns-page">
      {document.blocks.map((block) => {
        const definition = getBlockDefinition(block.type);
        if (!definition) {
          return (
            <div key={block.id} className="ns-block ns-block--unknown" data-block-type={block.type}>
              Bloc inconnu : {block.type}
            </div>
          );
        }

        const Component = definition.component;
        return (
          <div key={block.id} data-block-id={block.id} data-block-type={block.type}>
            <Component props={block.props} />
          </div>
        );
      })}
    </div>
  );
}
