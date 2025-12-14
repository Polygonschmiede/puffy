import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'pf-neumorphic-card',
  template: `
    <article class="pf-neumorphic-card" [class.pf-neumorphic-card--padded]="padded()">
      <ng-content />
    </article>
  `,
  styleUrl: './pf-neumorphic-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PfNeumorphicCard {
  readonly padded = input(true);
}
