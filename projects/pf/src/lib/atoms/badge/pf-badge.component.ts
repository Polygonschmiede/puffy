import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type PfBadgeVariant = 'raised' | 'flat';
export type PfBadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'destructive';

@Component({
  selector: 'pf-badge',
  imports: [],
  template: `<span class="pf-badge__label">{{ label() }}</span>`,
  styleUrl: './pf-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'badgeClass()'
  }
})
export class PfBadge {
  readonly label = input.required<string>();
  readonly variant = input<PfBadgeVariant>('raised');
  readonly tone = input<PfBadgeTone>('neutral');

  protected readonly badgeClass = computed(() => {
    const classes = ['pf-badge', `pf-badge--${this.variant()}`, `pf-badge--${this.tone()}`];
    return classes.join(' ');
  });
}
