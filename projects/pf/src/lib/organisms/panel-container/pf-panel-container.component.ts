import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'pf-panel-container',
  template: `
    <div class="pf-panel-container__grid" [style.gridTemplateColumns]="template()" [class]="className()">
      <ng-content />
    </div>
  `,
  styleUrl: './pf-panel-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-panel-container'
  }
})
export class PfPanelContainer {
  readonly columns = input(3);
  readonly gap = input<'sm' | 'md' | 'lg'>('md');

  protected readonly template = computed(() => `repeat(${this.columns()}, minmax(0, 1fr))`);

  protected readonly className = computed(() => `pf-panel-container__grid--gap-${this.gap()}`);
}
