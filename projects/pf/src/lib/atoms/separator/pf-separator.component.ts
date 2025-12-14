import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'pf-separator',
  template: `<div class="pf-separator__line"></div>`,
  styleUrl: './pf-separator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClass()',
    role: 'separator',
    '[attr.aria-orientation]': 'orientation()'
  }
})
export class PfSeparator {
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');

  protected readonly hostClass = computed(() =>
    ['pf-separator', `pf-separator--${this.orientation()}`].filter(Boolean).join(' ')
  );
}
