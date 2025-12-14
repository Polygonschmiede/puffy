import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'pf-scroll-area',
  template: `
    <div
      class="pf-scroll-area__viewport"
      [class.pf-scroll-area__viewport--horizontal]="orientation() === 'horizontal'"
      [class.pf-scroll-area__viewport--vertical]="orientation() === 'vertical'"
      [style.maxHeight]="maxHeight()"
      [style.maxWidth]="maxWidth()"
      [attr.data-orientation]="orientation()"
    >
      <ng-content />
    </div>
  `,
  styleUrl: './pf-scroll-area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClass()'
  }
})
export class PfScrollArea {
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');
  readonly maxHeight = input<string | undefined>('320px');
  readonly maxWidth = input<string | undefined>(undefined);

  protected readonly hostClass = computed(() =>
    ['pf-scroll-area', `pf-scroll-area--${this.orientation()}`].join(' ')
  );
}
