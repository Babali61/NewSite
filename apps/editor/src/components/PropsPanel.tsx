import { getBlockDefinition } from "@newsite/blocks";
import type { BlockInstance } from "@newsite/document";

type PropsPanelProps = {
  block: BlockInstance | null;
  onChangeProp: (key: string, value: unknown) => void;
  onRemove: () => void;
};

function listToString(value: unknown): string {
  if (Array.isArray(value)) return value.map(String).join(", ");
  return String(value ?? "");
}

function parseList(raw: string): string[] {
  return raw
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

export function PropsPanel({ block, onChangeProp, onRemove }: PropsPanelProps) {
  if (!block) {
    return (
      <section className="props-panel" aria-label="Propriétés du bloc" data-testid="props-panel-empty">
        <h2>Propriétés</h2>
        <p>Sélectionne un bloc dans l’aperçu ou la liste pour le modifier.</p>
      </section>
    );
  }

  const definition = getBlockDefinition(block.type);

  return (
    <section
      className="props-panel"
      aria-label="Propriétés du bloc"
      data-testid="props-panel"
      data-block-type={block.type}
    >
      <div className="props-panel__head">
        <h2>{definition?.label ?? block.type}</h2>
        <button
          type="button"
          className="props-panel__remove"
          data-testid="remove-block"
          onClick={onRemove}
        >
          Retirer
        </button>
      </div>

      {!definition ? (
        <p>Ce type de bloc n’a pas encore de schéma.</p>
      ) : (
        <form
          className="props-form"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          {definition.schema.map((field) => {
            const value = block.props[field.key];
            const id = `prop-${block.id}-${field.key}`;
            const testId = `prop-${field.key}`;

            if (field.kind === "textarea") {
              return (
                <label key={field.key} className="props-form__field" htmlFor={id}>
                  <span>{field.label}</span>
                  <textarea
                    id={id}
                    rows={4}
                    data-testid={testId}
                    value={String(value ?? "")}
                    onChange={(event) => onChangeProp(field.key, event.target.value)}
                  />
                </label>
              );
            }

            if (field.kind === "list") {
              return (
                <label key={field.key} className="props-form__field" htmlFor={id}>
                  <span>{field.label}</span>
                  <input
                    id={id}
                    type="text"
                    data-testid={testId}
                    value={listToString(value)}
                    onChange={(event) => onChangeProp(field.key, parseList(event.target.value))}
                  />
                </label>
              );
            }

            return (
              <label key={field.key} className="props-form__field" htmlFor={id}>
                <span>{field.label}</span>
                <input
                  id={id}
                  type="text"
                  data-testid={testId}
                  value={String(value ?? "")}
                  onChange={(event) => onChangeProp(field.key, event.target.value)}
                />
              </label>
            );
          })}
        </form>
      )}
    </section>
  );
}
