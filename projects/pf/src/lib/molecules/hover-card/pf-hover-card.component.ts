import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'pf-hover-card',
  imports: [],
  template: `
    <span class="pf-hover-card__trigger" (mouseenter)="show()" (mouseleave)="hide()" (focusin)="show()" (focusout)="hide()">
      <ng-content select="[pfHoverTrigger]"></ng-content>
    </span>
    @if (open()) {
      <div class="pf-hover-card__panel">
        <ng-content select="[pfHoverContent]"></ng-content>
      </div>
    }
  `,
  styleUrl: './pf-hover-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-hover-card'
  }
})
export class PfHoverCard {
  protected readonly open = signal(false);

  show(): void {
    this.open.set(true);
  }

  hide(): void {
    this.open.set(false);
  }
}
