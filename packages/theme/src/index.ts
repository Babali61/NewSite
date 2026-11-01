export type ThemeTokens = {
  colorPrimary: string;
  colorText: string;
  colorBg: string;
  colorSurface: string;
  radiusSm: string;
  radiusMd: string;
  radiusLg: string;
  spaceSm: string;
  spaceMd: string;
  spaceLg: string;
  fontDisplay: string;
  fontBody: string;
};

/** Tokens par défaut du thème NewSite (stub configurable). */
export const defaultThemeTokens: ThemeTokens = {
  colorPrimary: "#22746f",
  colorText: "#1a2a2a",
  colorBg: "#ffffff",
  colorSurface: "#f3f6f5",
  radiusSm: "0.35rem",
  radiusMd: "0.65rem",
  radiusLg: "1rem",
  spaceSm: "0.5rem",
  spaceMd: "1rem",
  spaceLg: "2rem",
  fontDisplay: '"Fraunces", "Iowan Old Style", Georgia, serif',
  fontBody: '"Source Sans 3", "Segoe UI", sans-serif',
};

/** Champs de thème exposés au panneau non-dev (labels humains). */
export type ThemeTokenField = {
  key: keyof ThemeTokens;
  label: string;
  kind: "color" | "text";
};

export const editableThemeFields: ThemeTokenField[] = [
  { key: "colorPrimary", label: "Couleur principale", kind: "color" },
  { key: "colorText", label: "Couleur du texte", kind: "color" },
  { key: "colorBg", label: "Fond du site", kind: "color" },
  { key: "colorSurface", label: "Fond de l’éditeur", kind: "color" },
];

/** Applique les tokens comme variables CSS sur `:root` (ou un élément cible). */
export function applyThemeTokens(
  tokens: ThemeTokens,
  target: HTMLElement | null = typeof document !== "undefined" ? document.documentElement : null,
): void {
  if (!target) return;

  const map: Record<string, string> = {
    "--ns-color-primary": tokens.colorPrimary,
    "--ns-color-text": tokens.colorText,
    "--ns-color-bg": tokens.colorBg,
    "--ns-color-surface": tokens.colorSurface,
    "--ns-radius-sm": tokens.radiusSm,
    "--ns-radius-md": tokens.radiusMd,
    "--ns-radius-lg": tokens.radiusLg,
    "--ns-space-sm": tokens.spaceSm,
    "--ns-space-md": tokens.spaceMd,
    "--ns-space-lg": tokens.spaceLg,
    "--ns-font-display": tokens.fontDisplay,
    "--ns-font-body": tokens.fontBody,
  };

  for (const [key, value] of Object.entries(map)) {
    target.style.setProperty(key, value);
  }
}
