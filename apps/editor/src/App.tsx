import { createDemoDocument } from "@newsite/document";
import { PageRenderer } from "@newsite/render";
import { applyThemeTokens, defaultThemeTokens } from "@newsite/theme";
import { useEffect } from "react";
import { BlockList } from "./components/BlockList";
import { EditorShell } from "./components/EditorShell";

/**
 * Éditeur squelette : structure prête pour @dnd-kit (liste ordonnée de blocs).
 * Le DnD complet arrivera dans un prochain jalon.
 */
export function App() {
  const document = createDemoDocument();

  useEffect(() => {
    applyThemeTokens(defaultThemeTokens);
  }, []);

  return (
    <EditorShell>
      <header className="editor-header">
        <p className="editor-brand">NewSite</p>
        <p className="editor-tagline">
          Compose ton site : blocs, thème, puis publie une URL gratuite.
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
        <aside className="editor-panel editor-panel--left" aria-label="Bibliothèque de blocs">
          <h2>Blocs</h2>
          <p>Ajoute et réordonne des sections. Le glisser-déposer arrive bientôt.</p>
        </aside>

        <main className="editor-canvas" aria-label="Aperçu de la page">
          {/* Zone sortable future (@dnd-kit) */}
          <BlockList blocks={document.blocks} />
          <div className="editor-preview">
            <PageRenderer document={document} />
          </div>
        </main>

        <aside className="editor-panel editor-panel--right" aria-label="Propriétés">
          <h2>Propriétés</h2>
          <p>Options du bloc sélectionné et tokens du thème.</p>
        </aside>
      </div>
    </EditorShell>
  );
}
