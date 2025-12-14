import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'pf-panel-header',
  template: `
    <header class="pf-panel-header">
      <div class="pf-panel-header__titles">
        @if (eyebrow()) {
          <p class="pf-panel-header__eyebrow">{{ eyebrow() }}</p>
        }
        <h3 class="pf-panel-header__title">{{ title() }}</h3>
        @if (subtitle()) {
          <p class="pf-panel-header__subtitle">{{ subtitle() }}</p>
        }
      </div>
      <div class="pf-panel-header__actions">
        <ng-content />
      </div>
    </header>
    `,
  styleUrl: './pf-panel-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PfPanelHeader {
  readonly title = input.required<string>();
  readonly subtitle = input<string | undefined>();
  readonly eyebrow = input<string | undefined>();
}
