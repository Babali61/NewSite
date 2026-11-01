import { getBlockDefinition } from "@newsite/blocks";
import {
  createBlock,
  createDemoDocument,
  type BlockInstance,
  type BlockType,
  type PageDocument,
} from "@newsite/document";
import { PageRenderer } from "@newsite/render";
import { applyThemeTokens, defaultThemeTokens, type ThemeTokens } from "@newsite/theme";
import { useEffect, useState } from "react";
import { BlockLibrary } from "./components/BlockLibrary";
import { BlockList } from "./components/BlockList";
import { EditorShell } from "./components/EditorShell";
import { PropsPanel } from "./components/PropsPanel";
import { ThemePanel } from "./components/ThemePanel";

export function App() {
  const [page, setPage] = useState<PageDocument>(createDemoDocument);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>("b-nav");
  const [theme, setTheme] = useState<ThemeTokens>(defaultThemeTokens);

  useEffect(() => {
    applyThemeTokens(theme);
  }, [theme]);

  const selectedBlock = page.blocks.find((block) => block.id === selectedBlockId) ?? null;

  function updateBlocks(blocks: BlockInstance[]) {
    setPage((current) => ({ ...current, blocks }));
  }

  function handleAddBlock(type: BlockType) {
    const definition = getBlockDefinition(type);
    const block = createBlock(type, definition?.defaultProps ?? {});
    updateBlocks([...page.blocks, block]);
    setSelectedBlockId(block.id);
  }

  function handleChangeProp(key: string, value: unknown) {
    if (!selectedBlockId) return;
    updateBlocks(
      page.blocks.map((block) =>
        block.id === selectedBlockId
          ? { ...block, props: { ...block.props, [key]: value } }
          : block,
      ),
    );
  }

  function handleRemoveBlock() {
    if (!selectedBlockId) return;
    const next = page.blocks.filter((block) => block.id !== selectedBlockId);
    updateBlocks(next);
    setSelectedBlockId(next[0]?.id ?? null);
  }

  function handleChangeToken(key: keyof ThemeTokens, value: string) {
    setTheme((current) => ({ ...current, [key]: value }));
  }

  return (
    <EditorShell>
      <header className="editor-header">
        <p className="editor-brand">NewSite</p>
        <p className="editor-tagline">
          Compose ton site : glisse les blocs, ajuste le texte et les couleurs.
        </p>
        <div className="editor-actions" aria-label="Actions principales">
          <button type="button" disabled title="Bientôt disponible">
            Voir le site
          </button>
          <button type="button" disabled title="Bientôt disponible">
            Publier
          </button>
        </div>
      </header>

      <div className="editor-layout">
        <BlockLibrary onAddBlock={handleAddBlock} />

        <main className="editor-canvas" aria-label="Aperçu de la page">
          <BlockList
            blocks={page.blocks}
            selectedBlockId={selectedBlockId}
            onSelect={setSelectedBlockId}
            onReorder={updateBlocks}
          />
          <div className="editor-preview">
            <PageRenderer
              document={page}
              selectedBlockId={selectedBlockId}
              onSelectBlock={setSelectedBlockId}
            />
          </div>
        </main>

        <aside className="editor-panel editor-panel--right" aria-label="Propriétés">
          <PropsPanel
            block={selectedBlock}
            onChangeProp={handleChangeProp}
            onRemove={handleRemoveBlock}
          />
          <ThemePanel tokens={theme} onChangeToken={handleChangeToken} />
        </aside>
      </div>
    </EditorShell>
  );
}
