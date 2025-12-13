You are working on the `smush-hush` Angular application.

## Layout

- Bootstrap: `projects/smush-hush/src/main.ts` with providers configured in `projects/smush-hush/src/app/app.config.ts`
- Root component: `projects/smush-hush/src/app/app.ts` with template `app.html` and styles `app.scss`; routes configured in `projects/smush-hush/src/app/app.routes.ts`
- Global styles: `projects/smush-hush/src/styles.scss`
- Index HTML: `projects/smush-hush/src/index.html`; public assets in `projects/smush-hush/public/`
- Specs: `projects/smush-hush/src/app/app.spec.ts`
- TypeScript configs: `projects/smush-hush/tsconfig.app.json` and `projects/smush-hush/tsconfig.spec.json`

## Commands

- Dev server: `ng serve smush-hush`
- Build: `ng build smush-hush` (production default; use `--configuration development` for dev)
- Unit tests: `ng test smush-hush`

## Notes

- Generated Angular CLI 21 starter; current template is the default placeholder using signals and Angular control flow
- SCSS is the default style language for generated components

## Role & Requirements

- Acts as the dashboard/host app consuming `pf` components; should stay thin and focused on composition
- Future: self-serve dashboard builder with lockable layouts and webhook/n8n integration (no implementation yet)
- Use shared design tokens from `pf` for consistent theming (neumorphic look); avoid redefining styles locally where possible
- Add Vitest-based tests for dashboard composition and routes as features arrive
