You are working on the `pf` design-system library (Angular 21, standalone-only).

## Layout

- Entry/public API: `projects/pf/src/public-api.ts` (aliased as `pf` via root `tsconfig.json`); package metadata `projects/pf/package.json`; build config `projects/pf/ng-package.json`
- Source: `projects/pf/src/lib/` with atomic hierarchy `atoms/`, `molecules/`, `organisms/`, `feedback/`, `form/`, plus shared tokens in `styles/pf-tokens.scss` and typed helpers in `tokens/theme.ts` (`buildThemeCssVars`, `applyPfTheme`)
- Example atoms: buttons, icon/icon-button, typography, avatar/image fallback, inputs/textarea/select/checkbox/radio/switch/toggle/slider/progress, surface/aspect-ratio/card, tooltip, skeleton, divider/separator, form-field + label + input-otp
- Example molecules: accordion, tabs, dialog/drawer/sheet, dropdown/popover/context menu/hover card/navigation/menubar/sidebar, pagination, table, toggle-group, breadcrumb, scroll-area, collapsible, resizable, radio-group/command/calendar/date-picker, chart, carousel
- Organisms: dashboard layout, panel container/header, draggable panel, neumorphic card; feedback: toast service + container; form helpers exported from `form/helpers`
- Stories: `projects/pf/src/stories/**/*.stories.ts` (assets under `stories/assets/`); Storybook config in `projects/pf/.storybook/` (`main.ts`, `preview.ts`, `tsconfig.json`, `typings.d.ts`) with compodoc JSON `projects/pf/documentation.json` and global token styles via `angularBuilderOptions.styles`
- Tests: colocated specs matching `projects/pf/**/*.spec.ts` (Vitest + Angular TestBed bootstrap in `vitest.worker-setup.ts`); legacy placeholder `lib/pf.ts` + `lib/pf.spec.ts` remain
- TypeScript configs: `projects/pf/tsconfig.lib*.json` for builds, `projects/pf/tsconfig.spec.json` for specs; zoneless test providers in `projects/pf/test.providers.ts`

## Commands

- Build library: `ng build pf`
- Storybook: `ng run pf:storybook` (dev) / `ng run pf:build-storybook` (static)
- Tests: `npm test` / `npm run test:watch` (Vitest, scoped to `projects/pf/**/*.spec.ts`)

## Notes & Practices

- Style direction: neumorphism with themeable tokens; host classes defined via `host` metadata (no `@HostBinding`/`@HostListener`)
- Components should stay small, OnPush, signal-based, with `input()`/`output()` and native control flow; keep exports centralized in `public-api.ts`
- When adding components: wire tokens, add Storybook docs/controls, and ship Vitest coverage; remove any leftover React artifacts if encountered
