import { editableThemeFields, type ThemeTokens } from "@newsite/theme";

type ThemePanelProps = {
  tokens: ThemeTokens;
  onChangeToken: (key: keyof ThemeTokens, value: string) => void;
};

function isHexColor(value: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(value);
}

export function ThemePanel({ tokens, onChangeToken }: ThemePanelProps) {
  return (
    <section className="theme-panel" aria-label="Thème" data-testid="theme-panel">
      <h2>Thème</h2>
      <p>Couleurs globales — tous les blocs suivent ces réglages.</p>
      <form
        className="props-form"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        {editableThemeFields.map((field) => {
          const id = `theme-${field.key}`;
          const value = tokens[field.key];

          if (field.kind === "color") {
            return (
              <div
                key={field.key}
                className="props-form__field props-form__field--color-row"
                data-testid={`theme-field-${field.key}`}
              >
                <label htmlFor={id}>{field.label}</label>
                <div className="props-form__color-controls">
                  <input
                    id={id}
                    type="color"
                    value={isHexColor(value) ? value : "#000000"}
                    aria-label={`${field.label} (nuancier)`}
                    onChange={(event) => onChangeToken(field.key, event.target.value)}
                  />
                  <input
                    type="text"
                    inputMode="text"
                    spellCheck={false}
                    value={value}
                    aria-label={`${field.label} (hex)`}
                    data-testid={`theme-hex-${field.key}`}
                    onChange={(event) => {
                      const next = event.target.value.trim();
                      if (isHexColor(next) || next.startsWith("#")) {
                        onChangeToken(field.key, next);
                      } else {
                        onChangeToken(field.key, next);
                      }
                    }}
                  />
                </div>
              </div>
            );
          }

          return (
            <label key={field.key} className="props-form__field" htmlFor={id}>
              <span>{field.label}</span>
              <input
                id={id}
                type="text"
                value={value}
                onChange={(event) => onChangeToken(field.key, event.target.value)}
              />
            </label>
          );
        })}
      </form>
    </section>
  );
}
