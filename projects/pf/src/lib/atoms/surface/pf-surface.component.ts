import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'pf-surface',
  template: `
    <div [class]="className()">
      <ng-content />
    </div>
  `,
  styleUrl: './pf-surface.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': "'pf-surface'"
  }
})
export class PfSurface {
  readonly padding = input<'none' | 'sm' | 'md' | 'lg'>('md');
  readonly elevation = input<'flat' | 'soft' | 'raised'>('soft');
  readonly inset = input(false);

  protected readonly className = computed(() =>
    [
      'pf-surface__body',
      `pf-surface__padding-${this.padding()}`,
      `pf-surface__${this.elevation()}`,
      this.inset() ? 'pf-surface__inset' : ''
    ]
      .filter(Boolean)
      .join(' ')
  );
}
