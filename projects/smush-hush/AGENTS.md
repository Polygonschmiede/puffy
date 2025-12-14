You are working on the `smush-hush` Angular application (host for the `pf` design system).

## Layout

- Bootstrap: `projects/smush-hush/src/main.ts` with providers in `app.config.ts` (`provideBrowserGlobalErrorListeners`, router)
- Root component: `projects/smush-hush/src/app/app.ts` + `app.html`/`app.scss`; currently renders `<pf-button label="Launch">`
- Routing: `projects/smush-hush/src/app/app.routes.ts` (empty array for now)
- Global styles: `projects/smush-hush/src/styles.scss`; entry HTML `projects/smush-hush/src/index.html`; public assets under `projects/smush-hush/public/`
- Specs: `projects/smush-hush/src/app/app.spec.ts` (still asserts the old `Hello, smush-hush` heading—will fail until template/test are aligned)
- TypeScript configs: `projects/smush-hush/tsconfig.app.json` and `projects/smush-hush/tsconfig.spec.json`; path alias `pf` defined in root `tsconfig.json`

## Commands

- Dev server: `ng serve smush-hush` (npm start)
- Build: `ng build smush-hush` (production default; add `--configuration development` for dev)
- Unit tests: `ng test smush-hush` (Vitest is only configured for the `pf` library)

## Role & Requirements

- Acts as the dashboard/host app consuming `pf` components; keep it thin and focused on composition
- Target experience: neumorphic dashboard builder (future: lockable layouts, webhook/n8n integration)
- Reuse `pf` tokens/styles where possible; avoid duplicating design primitives locally
- As features arrive, add Vitest/Angular tests for routes and compositions to mirror the library’s coverage standards
