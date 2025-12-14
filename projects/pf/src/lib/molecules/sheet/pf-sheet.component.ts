import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'pf-sheet',
  template: `
    @if (open()) {
      <div class="pf-sheet__backdrop" (click)="backdropClose()"></div>
      <aside
        class="pf-sheet__panel"
        [class]="panelClass()"
        role="dialog"
        aria-modal="true"
        [attr.data-side]="side()"
      >
        <header class="pf-sheet__header">
          <h3 class="pf-sheet__title">{{ title() }}</h3>
          <button type="button" class="pf-sheet__close" (click)="close()" aria-label="Schließen">×</button>
        </header>
        <div class="pf-sheet__body">
          <ng-content />
        </div>
      </aside>
    }
  `,
  styleUrl: './pf-sheet.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-sheet'
  }
})
export class PfSheet {
  readonly open = input(false);
  readonly side = input<'left' | 'right' | 'bottom'>('right');
  readonly title = input('Sheet');
  readonly closeOnBackdrop = input(true);

  readonly openChange = output<boolean>();

  protected panelClass(): string {
    return ['pf-sheet__panel', `pf-sheet__panel--${this.side()}`].join(' ');
  }

  close(): void {
    this.openChange.emit(false);
  }

  backdropClose(): void {
    if (this.closeOnBackdrop()) {
      this.close();
    }
  }
}
