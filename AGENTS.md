You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## Repository Overview

- Angular CLI 21 workspace with application and library under `projects/`
- Application `smush-hush`: entry `projects/smush-hush/src/main.ts`, root component `projects/smush-hush/src/app/app.ts` with template/style files alongside, routes in `projects/smush-hush/src/app/app.routes.ts`, global styles `projects/smush-hush/src/styles.scss`, static assets under `projects/smush-hush/public/`
- Library `pf`: public API `projects/pf/src/public-api.ts`, default component in `projects/pf/src/lib/pf.ts` with test `projects/pf/src/lib/pf.spec.ts`, Storybook stories and assets in `projects/pf/src/stories/`, Storybook config in `projects/pf/.storybook/`
- Workspace configs: `angular.json` for project targets, root TypeScript config `tsconfig.json`, package metadata in `package.json`
- Common commands: `npm start`/`ng serve smush-hush` for the app, `ng build smush-hush` for production bundle, `ng build pf` for the library, Storybook via `ng run pf:storybook`, unit tests via `npm test`
- Vitest setup: `vitest.config.ts` uses Angular Vite plugin and worker setup `vitest.worker-setup.ts` to init Angular TestBed; tests limited to `projects/pf/**/*.spec.ts`

## Vision & Requirements (long-term notes)

- Goal: build a reusable UI framework/design library (`pf`) in Angular 21 using atomic design + design tokens, publishable for multiple apps
- Style direction: Neumorphism with easily swappable color/typography tokens; prioritize responsive, clean, accessible components
- Consumption: `smush-hush` dashboard app will consume `pf` components and evolve into a self-serve dashboard builder (future: lockable layouts, webhooks/n8n integration)
- Migration: React sample/figma reference is the source for components; remove any legacy React code as we port
- Storybook: every component added/ported must be showcased in Storybook alongside docs/controls
- Testing: every component needs coverage with Vitest; add harness so Angular + Vitest coexist (no `any`, use strict typing)
