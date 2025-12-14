# pf Design System

Angular 21 standalone design-system library with a neumorphic theme and atomic structure (atoms → molecules → organisms). The library is consumed via the `pf` path alias pointing to `projects/pf/src/public-api.ts` (or `dist/pf` after build).

## Structure

- Public API: `projects/pf/src/public-api.ts` (exports atoms, molecules, organisms, feedback toast service/container, form helpers, and theme utilities)
- Source: `projects/pf/src/lib/` with atoms (buttons, inputs, selection, overlays, typography, surfaces, imagery, skeleton/divider), molecules (accordion, tabs, dialog/drawer/sheet, dropdown/popover/context menu/hover card/navigation/menubar/sidebar, pagination/table/toggle-group, breadcrumb/scroll-area/collapsible/resizable, radio-group/command/calendar/date-picker, chart, carousel), organisms (dashboard layout, panel container/header, draggable panel, neumorphic card), feedback (toast), and form helpers
- Tokens: `projects/pf/src/lib/styles/pf-tokens.scss` (neumorphic CSS vars) and typed theme helpers `projects/pf/src/lib/tokens/theme.ts` (`buildThemeCssVars`, `applyPfTheme`)
- Storybook: config in `projects/pf/.storybook/` (compodoc JSON `documentation.json`, global token styles) and stories under `projects/pf/src/stories/`
- Tests: colocated specs matching `projects/pf/**/*.spec.ts`, bootstrapped via `vitest.worker-setup.ts`; legacy placeholder component `lib/pf.ts` and spec remain

## Commands

- Build: `ng build pf`
- Storybook: `ng run pf:storybook` (dev) / `ng run pf:build-storybook` (static export)
- Tests (Vitest): `npm test` / `npm run test:watch`

## Guidelines

- Standalone components only; OnPush, signals, `input()`/`output()`, native control flow; host bindings via `host` metadata
- Keep exports centralized in `public-api.ts`
- Add Storybook docs/controls and Vitest coverage for every component; align styles with neumorphic tokens and remove any leftover React artifacts when encountered
