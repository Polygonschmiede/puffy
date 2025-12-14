import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'pf-skeleton',
  imports: [],
  template: ``,
  styleUrl: './pf-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.width]': 'width()',
    '[style.height]': 'height()',
    class: 'pf-skeleton'
  }
})
export class PfSkeleton {
  readonly width = input<string | undefined>('100%');
  readonly height = input<string | undefined>('1rem');
}
