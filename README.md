# Puffy

Angular 21 workspace with a neumorphic design-system library (`pf`) and a host dashboard app (`smush-hush`). The `pf` library follows atomic design, ships Storybook docs, and exposes a `pf` path alias for consumption inside the app.

## Quickstart

- Install deps: `npm install`
- Run app: `npm start` (alias for `ng serve smush-hush`)
- Run Storybook: `ng run pf:storybook`

## Projects

- `smush-hush` (app): Bootstrap at `projects/smush-hush/src/main.ts` with providers in `app.config.ts`. Root component `app.ts` renders `pf` components (currently a `<pf-button>`). Routes live in `app.routes.ts` (empty stub). Styles use SCSS (`src/styles.scss`).
- `pf` (library): Entry/public API `projects/pf/src/public-api.ts` (aliased as `pf`). Atomic source under `projects/pf/src/lib/{atoms,molecules,organisms,feedback,form}`; tokens in `lib/styles/pf-tokens.scss`; theme helpers in `lib/tokens/theme.ts`; Storybook config in `projects/pf/.storybook/`; stories in `projects/pf/src/stories/`.

## Commands

- App dev: `ng serve smush-hush`
- App build: `ng build smush-hush` (add `--configuration development` for non-prod)
- Library build: `ng build pf`
- Storybook: `ng run pf:storybook` (dev) / `ng run pf:build-storybook` (static)
- Tests (library via Vitest): `npm test` / `npm run test:watch` (`projects/pf/**/*.spec.ts`)

## Notes

- Path alias `pf` resolves to the library public API (`projects/pf/src/public-api.ts` or `dist/pf` after build) via `tsconfig.json`.
- Components should remain standalone, OnPush, signal-first, and use native control flow. Host bindings belong in the `host` metadata.
- The app unit test `projects/smush-hush/src/app/app.spec.ts` still asserts the old placeholder heading; update alongside template changes.
