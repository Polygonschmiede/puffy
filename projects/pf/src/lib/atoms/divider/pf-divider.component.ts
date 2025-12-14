import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type PfDividerOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'pf-divider',
  imports: [],
  template: ``,
  styleUrl: './pf-divider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.horizontal]': 'orientation() === "horizontal"',
    '[class.vertical]': 'orientation() === "vertical"',
    role: 'presentation'
  }
})
export class PfDivider {
  readonly orientation = input<PfDividerOrientation>('horizontal');
}
