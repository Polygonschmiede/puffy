You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Core Practices

- Strict TypeScript; prefer inference; avoid `any` (use `unknown` when uncertain)
- Standalone-first Angular 21; never set `standalone: true` explicitly (it is the default)
- Signals for state + `computed()` for derived data; no `mutate`, use `set`/`update`
- Components stay small/single-purpose with `input()`/`output()`, OnPush change detection, native control flow (`@if`, `@for`, `@switch`), class/style bindings instead of `ngClass`/`ngStyle`
- Host bindings via the `host` object (no `@HostBinding`/`@HostListener`)
- Prefer reactive forms; use `NgOptimizedImage` for static images (not for base64)

## Workspace Map (Angular 21)

- Path alias `pf` maps to `projects/pf/src/public-api.ts` (and `dist/pf` after build) via `tsconfig.json`
- App `smush-hush` (SCSS): bootstrap `projects/smush-hush/src/main.ts`, providers `app.config.ts`, root component `app.ts` + `app.html`/`app.scss`, routes in `app.routes.ts` (currently empty), globals `src/styles.scss`, public assets `projects/smush-hush/public/`
- Library `pf`: design system at `projects/pf/src` with atomic hierarchy under `lib/{atoms,molecules,organisms,feedback,form}`; tokens in `lib/styles/pf-tokens.scss`; typed theme helpers in `lib/tokens/theme.ts`; Storybook config in `projects/pf/.storybook/`; stories under `projects/pf/src/stories/`; compodoc output `documentation.json`

## Library Snapshot (`pf`)

- Public API exports many primitives: atoms (buttons, icon/icon-button, inputs/textarea/select/checkbox/radio, form-field + label, slider/progress/switch/toggle, tooltip/popover triggers, avatar/image fallback, typography, surface/aspect-ratio/card, skeleton/divider/separator), molecules (accordion, tabs, dialog/drawer/sheet, dropdown/popover/context menu/hover card/navigation/menubar/sidebar, pagination, table, toggle-group, breadcrumb, scroll-area, collapsible, resizable, radio-group/command/calendar/date-picker, chart, carousel), organisms (dashboard layout, panel container/header, draggable panel, neumorphic card), feedback (toast service + container), form helpers, and theme utilities
- Styles follow neumorphic tokens (`pf-tokens.scss`) with host classes declared in component `host` metadata; Storybook pulls tokens globally via `angularBuilderOptions.styles` and wraps stories with a neumorphic surface
- Vitest specs live alongside components (include pattern `projects/pf/**/*.spec.ts`); Angular TestBed bootstrapped via `vitest.worker-setup.ts`

## App Snapshot (`smush-hush`)

- Minimal host app currently rendering `<pf-button label="Launch">`; routes are empty
- Unit test `projects/smush-hush/src/app/app.spec.ts` still asserts the old heading `Hello, smush-hush` (will fail until the template is updated)
- Providers include `provideBrowserGlobalErrorListeners()` and router setup

## Commands

- App dev: `ng serve smush-hush` (npm start)
- App build: `ng build smush-hush` (use `--configuration development` for dev)
- Library build: `ng build pf`
- Storybook: `ng run pf:storybook` (dev) / `ng run pf:build-storybook` (static)
- Vitest (library specs): `npm test` (`vitest run`) or `npm run test:watch`

## Vision & Direction

- Build a reusable neumorphic UI framework (`pf`) with atomic design and themeable tokens, consumed by the `smush-hush` dashboard (future: self-serve builder, lockable layouts, webhook/n8n integration)
- Every new component: align with tokens + accessibility, add Storybook docs/controls, and ship Vitest coverage; remove any legacy React artifacts when encountered
