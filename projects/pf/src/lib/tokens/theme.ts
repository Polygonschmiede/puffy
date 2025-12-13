export type PfTheme = {
  colors: {
    surface: string;
    surfaceStrong: string;
    accent: string;
    accentStrong: string;
    muted: string;
    contrast: string;
    contrastWeak: string;
    border: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
  };
  shadow: {
    raised: string;
    pressed: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
  typography: {
    family: string;
    weightMedium: number;
    weightSemibold: number;
    weightBold: number;
    sizeSm: string;
    sizeMd: string;
    sizeLg: string;
  };
};

export const defaultPfTheme: PfTheme = {
  colors: {
    surface: '#e9edf5',
    surfaceStrong: '#d7dde8',
    accent: '#5f7bff',
    accentStrong: '#3f63ff',
    muted: '#5a6475',
    contrast: '#0f172a',
    contrastWeak: '#1f2937',
    border: '#cbd4e3'
  },
  radius: {
    sm: '12px',
    md: '16px',
    lg: '20px'
  },
  shadow: {
    raised: '10px 10px 20px #cbd4e3, -10px -10px 20px #f8fbff',
    pressed: 'inset 10px 10px 20px #cbd4e3, inset -10px -10px 20px #f8fbff'
  },
  spacing: {
    xs: '0.35rem',
    sm: '0.55rem',
    md: '0.75rem',
    lg: '1rem'
  },
  typography: {
    family: "'Inter', 'Inter Tight', system-ui, -apple-system, 'Segoe UI', sans-serif",
    weightMedium: 500,
    weightSemibold: 600,
    weightBold: 700,
    sizeSm: '0.875rem',
    sizeMd: '1rem',
    sizeLg: '1.125rem'
  }
};

type CssVarMap = Record<string, string>;

export const buildThemeCssVars = (theme: PfTheme): CssVarMap => ({
  '--pf-color-surface': theme.colors.surface,
  '--pf-color-surface-strong': theme.colors.surfaceStrong,
  '--pf-color-accent': theme.colors.accent,
  '--pf-color-accent-strong': theme.colors.accentStrong,
  '--pf-color-muted': theme.colors.muted,
  '--pf-color-contrast': theme.colors.contrast,
  '--pf-color-contrast-weak': theme.colors.contrastWeak,
  '--pf-color-border': theme.colors.border,
  '--pf-radius-sm': theme.radius.sm,
  '--pf-radius-md': theme.radius.md,
  '--pf-radius-lg': theme.radius.lg,
  '--pf-shadow-raised': theme.shadow.raised,
  '--pf-shadow-pressed': theme.shadow.pressed,
  '--pf-spacing-xs': theme.spacing.xs,
  '--pf-spacing-sm': theme.spacing.sm,
  '--pf-spacing-md': theme.spacing.md,
  '--pf-spacing-lg': theme.spacing.lg,
  '--pf-typography-family': theme.typography.family,
  '--pf-typography-weight-medium': `${theme.typography.weightMedium}`,
  '--pf-typography-weight-semibold': `${theme.typography.weightSemibold}`,
  '--pf-typography-weight-bold': `${theme.typography.weightBold}`,
  '--pf-font-size-sm': theme.typography.sizeSm,
  '--pf-font-size-md': theme.typography.sizeMd,
  '--pf-font-size-lg': theme.typography.sizeLg
});

export const applyPfTheme = (theme: PfTheme, target?: HTMLElement): void => {
  const node = target ?? document.documentElement;
  const vars = buildThemeCssVars(theme);

  Object.entries(vars).forEach(([key, value]) => {
    node.style.setProperty(key, value);
  });
};
