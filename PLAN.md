# pf Port Plan & Status

## Erledigt
- **Atoms (Neumorph)**: Button, Badge, Card, Avatar, Alert, Switch, Input, Checkbox, Radio, Textarea, Select, Progress, Slider, Tooltip, IconButton, Divider, Skeleton – alle mit OnPush/Signals, pf-Tokens, Stories, Tests (Vitest grün).
- **Molecules**: Accordion, Tabs, Dialog (modal), Drawer, Table (basic), Pagination – Stories + Tests.
- **Overlays/Navigation (Batch 1+2)**: Dropdown, Popover, AlertDialog, ContextMenu, HoverCard, NavigationMenu, Menubar, Sidebar – Stories + Tests.
- Storybook-Preview auf pf-Surface gesetzt; Tokens um Soft/Inset-Shadows & semantische Farben erweitert.
- Public API/Barrels aktualisiert; `npm test` zuletzt grün.

## Offene Portierungen (Shadcn/ui-Rest)
- **Form/Inputs**: Label/Form wrappers, Input-OTP.
- **Toggles/Groups**: Toggle, ToggleGroup (Button-Group), ggf. RadioGroup-Variante.
- **Layout/Utility**: Collapsible, Resizable, ScrollArea, Sheet (Overlay/Drawer-Variante), AspectRatio, Separator (UI-Variante falls nötig).
- **Feedback/Toast**: Sonner/Toast.
- **Data/Date**: Calendar/Date Picker, Chart wrapper, Carousel.
- **Command**: Command palette/listbox behavior.
- **Navigation/Data**: Breadcrumb (UI), Table-Extras falls gewünscht.

## Empfohlene nächste Batches
1) Toggles + Groups + Breadcrumb + Separator/AspectRatio + ScrollArea/Sheet/Collapsible/Resizable (Layout/utility).
2) Form-Extras: Label/Form wrappers, Input-OTP, Command palette.
3) Date/Feedback/Data: Calendar/Date Picker, Toast/Sonner, Carousel/Chart wrapper.

## Tests
- `npm test` (Vitest) – alle aktuellen Suites grün (Stand letzter Lauf).

## Aktuelle Sprint-Ziele (nächste Iteration)
- Toggle & ToggleGroup (inkl. Keyboard-Navigation, pressed-state via Signal, host bindings im `host`-Objekt) – Stories/Tests.
- Breadcrumb (UI-Variante) – schlanke API, responsive Collapse ab XS, aria-current setzen.
- Separator/AspectRatio – einfache, tokenisierte Utility-Komponenten; Separator nur als UI-Variante falls Mehrwert ggü. Divider.
- ScrollArea + Sheet + Collapsible + Resizable – auf bestehende Overlay/Drawer-Patterns aufsetzen; fokusfeste Steuerung, inert für Offscreen-Content.
- Form-Label/FormField-Wrapper + Input-OTP – Signals, Fehler-States, beschreibende IDs für A11y.
- Command Palette – listbox/combobox-Behavior, Overlay + Keyboard-Shortcuts; Stories/Tests früh anlegen.

## Technische Leitplanken (beibehalten)
- Nur Standalone-Komponenten, `changeDetection: OnPush`, State via Signals/`computed`; keine Decorator-Inputs, nur `input()`/`output()`.
- Host-Bindings über `host`-Objekt; keine `@HostBinding`/`@HostListener`.
- Native Control Flow (`@if`/`@for`/`@switch`), keine `ngClass`/`ngStyle`, stattdessen `class`-/`style`-Bindings.
- `NgOptimizedImage` für statische Assets; Overlay/Focus-Traps wie bei Dialog/Drawer wiederverwenden.
- Formularkram: Reactive Forms bevorzugen; keine `mutate` auf Signals, nur `set`/`update`.

## Storybook/Docs Checks
- Jede neue Komponente: Controls + A11y-Notes + Token-Referenzen (Farben, Shadow, Radius). Preview bleibt auf pf-Surface.
- Varianten/States in Stories abbilden (hover/focus/pressed/disabled/error). Responsives Verhalten dokumentieren.

## Tests & CI
- Für jede neue Komponente Vitest-Spec mit Render/Interaction/A11y-Snapshots; ARIA-Roles/Labels prüfen.
- Reusable Test-Harness für Toggles/Overlays weiterverwenden; flakey Tests minimieren (fake timers wo nötig).
- Nach Batch-Abschluss `npm test` und Storybook smoke-run (`ng run pf:storybook --configuration=ci` falls vorhanden).

## Storybook-Definition of Done (DoD)
- Jede Story hat Controls für alle öffentlichen Inputs/Outputs, ARIA-Notes, Figma/Token-Links (falls vorhanden) und einen Usage-Abschnitt.
- States/Varianten klar getrennt (Default, Hover, Focus, Pressed, Disabled, Error, Compact/Condensed); responsive Breakpoints demonstrieren, falls Layout-relevant.
- Interaktionstest in Storybook (Play Function) für wichtigste Pfade (Focus-Trap, Toggle-State, Keyboard-Navigation).
- Keine Inline-Base64-Bilder; statische Assets über `NgOptimizedImage`.

## Test-Definition of Done (DoD)
- Unit-Tests (Vitest) pro Komponente: Render mit Default/Variant-Props, ARIA-Rollen/Labels, Keyboard/Mouse-Interaktion, Signals-Updates (set/update) und Snapshot für A11y-Tree.
- Edge-Cases: disabled/readonly, focus handling, controlled vs. uncontrolled (falls relevant), SSR-safe Guards bei globalen Objekten.
- Test-Harness wiederverwenden (z. B. Overlay-Fokus, Toggle-Pressevents), fake timers nur bei Animations-Abhängigkeiten.
- Bei neuen Form-Komponenten: Invalid/Valid-State, Fehler-Message-Rendering, `aria-describedby`/`aria-invalid` gesetzt.

## Komponenten-Checkliste (vor Merge)
- Öffentliche API geprüft: Inputs/Outputs benannt, Defaults sinnvoll, keine `any`/`mutate`.
- Tokens angewendet (Farben, Radius, Shadow, Spacing), Theme-Varianten passen zum pf-Surface.
- Host-Objekt deckt Classes/ARIA ab; keine `ngClass`/`ngStyle`.
- Dokumentation: Storybook-Eintrag, README-Snippet oder Notes, Public API Barrel exportiert.

## Umsetzungsnotizen (Batch 1 Komponenten)
- **Toggle**: `aria-pressed`/`role="button"`, Space/Enter toggelt; Signal-State, optional `toggledChange` Output. Story: Default/On/Disabled/Loading; Test: Keyboard/Mouse, focus ring, disabled blockt Events.
- **ToggleGroup**: Roving Tabindex, Arrow-Keys zyklisch, optional Single/Multi-Select. Story: Toolbar-Style + Pill-Style; Test: focus movement, selection sync, `aria-pressed` per Button.
- **Breadcrumb**: ARIA `nav` + `aria-label`, letzter Eintrag `aria-current="page"`, Collapsing ab XS (ellipsis + menu). Story: kurze/lange Trails; Test: collapse logic, accessible links, keyboard open/close des Collapses.
- **Separator/AspectRatio**: Separator nur UI-Variante (keine Funktionalität wie Divider); AspectRatio setzt Wrapper + Slot; Stories minimal. Tests: renders, class bindings, ratio clamp.
- **ScrollArea**: Wrapper mit Scrollbar-Styling, `aria-orientation`, `data-scrollbar`. Story: Inhalt lang/kurz, Horizontal/Vertical. Test: overflow classes, scrollbar presence, resize observer guard (SSR-safe).
- **Sheet**: Nutzt Drawer/Overlay-Patterns (Focus Trap, inert), `side` Variants. Story: Left/Right/Bottom + with form content. Test: open/close via keyboard, focus return, body-scroll lock reused.
- **Collapsible**: Controlled/Uncontrolled via Signal; `aria-expanded`/`aria-controls`. Story: Default, nested, icon alignment. Test: toggle via button, content mounts/unmounts, transitions guard.
- **Resizable**: Handle mit `aria-label`, keyboard resize optional (Arrow + step). Story: Horizontal/Vertical panes. Test: mouse drag events debounced, min/max respected, resize callback fired.


---
Shadcn/ui‑Set: Alles portiert und in public-api exportiert (Toggle/ToggleGroup, Command, Toast, Calendar/DatePicker, Chart, Carousel, ScrollArea, Sheet, Collapsible, Resizable, FormField/Label +
RadioGroup + Input OTP, etc.). Tests und Stories vorhanden.
- Noch nicht portiert (React-only):
  - Layout/Organisms/Templates: DashboardLayout.tsx, PanelContainer.tsx, DraggablePanel.tsx, NeumorphicCard.tsx, PanelHeader.tsx.
  - Atoms/Foundations: Typography.tsx, Icon.tsx, Surface.tsx, ImageWithFallback.tsx.
  - React-Hook-Form Helpers: ui/form.tsx (FormProvider/FormItem/FormControl/FormMessage/FormDescription). Wir haben nur einen einfachen pf-form-field; die RHF-spezifische API fehlt noch.
  - Neumorphic-* Wrapper aus components/neumorphic/* überschneiden sich inhaltlich mit pf-Atoms, aber die exakten Wrapper sind nicht 1:1 umgesetzt.
- Falls du die fehlenden Layout/Foundation-Komponenten und das RHF-Form-Paket auch in pf brauchst, sag Bescheid, dann baue ich sie als schlanke Angular-Pendants (Typography/Surface/Icon +
  Draggable/Panel-Layout + Form-Control Helpers). Storybook/Tests mache ich dann direkt mit.

Storybook-Smoke wäre als nächster Schritt sinnvoll, um die neuen Komponenten visuell zu checken.

---
• Fehlende React-Bausteine portiert und in pf exportiert (OnPush/Signals, host-Bindings, native Control Flow):

- Foundations/Atoms: Typography (pf-typography), Icon (pf-icon), Surface (pf-surface), ImageWithFallback (pf-image-fallback + NgOptimizedImage), Stories/Specs.
- Layout/Organisms/Templates: PanelContainer, DraggablePanel, PanelHeader, NeumorphicCard, DashboardLayout + Stories/Specs.
- Form Helpers (RHF-Äquivalent): FormItem/FormControl/FormDescription/FormMessage; Story hinzugefügt.
- Public API/Barrels aktualisiert; lib/index.ts exportiert atoms/molecules/organisms/feedback/form.
- Stories ergänzt: typography, icon, surface, image-fallback, panel-container, draggable-panel, dashboard-layout, panel-header, neumorphic-card, form-helpers.
- Tests: npm test grün.

Damit sind alle React-Komponenten (inkl. Layout/Organisms/Templates und Form-Helfer) ins Angular-pf übernommen. Storybook-Smoke empfehlenswert, um die neuen Layout-/Foundation-Teile visuell zu
checken.

