You are working on the `pf` Angular library scaffold.

## Layout

- Entry: `projects/pf/src/public-api.ts` exports `Pf` component from `projects/pf/src/lib/pf.ts`
- Tests: `projects/pf/src/lib/pf.spec.ts`
- Stories: Storybook stories in `projects/pf/src/stories/` with shared assets in `projects/pf/src/stories/assets/`; styles for stories in `projects/pf/src/stories/*.css`
- Storybook config: `projects/pf/.storybook/` (`main.ts`, `preview.ts`, `tsconfig.json`, `typings.d.ts`)
- Packaging configs: `projects/pf/ng-package.json`, library TypeScript configs `projects/pf/tsconfig.lib*.json`, `projects/pf/tsconfig.spec.json`
- Design tokens: default CSS tokens in `projects/pf/src/lib/styles/pf-tokens.css`; typed theme helpers in `projects/pf/src/lib/tokens/theme.ts`
- Atomic structure starting at `projects/pf/src/lib/atoms/` (e.g., button atom in `atoms/button`)

## Commands

- Build library: `ng build pf`
- Run unit tests: `ng test pf`
- Storybook dev: `ng run pf:storybook`
- Storybook build: `ng run pf:build-storybook`
- Vitest: `npm test` (scope includes only `projects/pf/**/*.spec.ts`)

## Notes

- Generated with Angular CLI 21; current component is placeholder in `pf.ts`
- Keep library exports centralized in `public-api.ts` (buttons + theme helpers exported)
- TestBed is initialized in specs (see `pf.spec.ts` and `atoms/button/pf-button.component.spec.ts`) because Angular 21 requires explicit init when using Vitest

## Design System Direction

- Target: Neumorphism aesthetic using design tokens for color, elevation, radius, typography, spacing; tokens must be easy to theme/swap
- Architecture: Atomic design (atoms, molecules, organisms, templates/pages) mirrored in source + Storybook structure; keep small, focused components
- Accessibility: maintain focus states and contrast while honoring neumorphic look; OnPush, signals, and computed state
- Responsiveness: components must adapt fluidly; prefer flex/grid primitives and clamp-based typography/spacing tokens

## Migration Plan

- Port components from the provided Figma/React reference into Angular; remove any leftover React scaffolding when done
- For each component: implement with tokens + atomic placement, add Storybook story (controls/args), add Vitest spec
- Expand `public-api.ts` as new atoms/molecules/organisms land; avoid unused exports

## Testing

- Use Vitest for component/unit tests; ensure Angular + Vitest setup exists and run per-component specs
- Example coverage: `projects/pf/src/lib/atoms/button/pf-button.component.spec.ts`
- Shared test bootstrap: `vitest.worker-setup.ts` initializes Angular testing env for Vitest workers
