import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'subtitle' | 'body' | 'muted' | 'code';

@Component({
  selector: 'pf-typography',
  template: `
    <span [class]="className()">
      <ng-content />
    </span>
  `,
  styleUrl: './pf-typography.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': "'pf-typography'"
  }
})
export class PfTypography {
  readonly variant = input<TypographyVariant>('body');

  protected readonly className = computed(
    () => ['pf-typography__text', `pf-typography__${this.variant()}`].join(' ')
  );
}
