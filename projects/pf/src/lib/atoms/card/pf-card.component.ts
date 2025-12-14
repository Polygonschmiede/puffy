import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type PfCardVariant = 'raised' | 'flat' | 'pressed';
export type PfCardPadding = 'none' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'pf-card',
  imports: [],
  template: `<ng-content></ng-content>`,
  styleUrl: './pf-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'cardClass()'
  }
})
export class PfCard {
  readonly variant = input<PfCardVariant>('raised');
  readonly padding = input<PfCardPadding>('md');

  protected readonly cardClass = computed(() => {
    const classes = ['pf-card', `pf-card--${this.variant()}`, `pf-card--pad-${this.padding()}`];
    return classes.join(' ');
  });
}
