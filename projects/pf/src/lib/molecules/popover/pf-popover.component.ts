import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'pf-popover',
  imports: [],
  template: `
    <button
      type="button"
      class="pf-popover__trigger"
      [attr.aria-expanded]="open()"
      (click)="toggle()"
    >
      {{ label() }}
    </button>

    @if (open()) {
      <div class="pf-popover__panel" role="dialog">
        <ng-content></ng-content>
      </div>
    }
  `,
  styleUrl: './pf-popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-popover'
  }
})
export class PfPopover {
  readonly label = input('Open');
  readonly openChange = output<boolean>();

  protected readonly open = signal(false);

  toggle(): void {
    const next = !this.open();
    this.open.set(next);
    this.openChange.emit(next);
  }
}
