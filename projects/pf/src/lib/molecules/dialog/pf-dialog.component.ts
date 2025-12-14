import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'pf-dialog',
  imports: [],
  template: `
    @if (open()) {
      <div class="pf-dialog__backdrop" (click)="backdropClose()"></div>
      <div class="pf-dialog__panel" role="dialog" aria-modal="true">
        <header class="pf-dialog__header">
          <h3 class="pf-dialog__title">{{ title() }}</h3>
          <button type="button" class="pf-dialog__close" (click)="close()">×</button>
        </header>
        <div class="pf-dialog__body">
          <ng-content></ng-content>
        </div>
        @if (showFooter()) {
          <footer class="pf-dialog__footer">
            <ng-content select="[pfDialogActions]"></ng-content>
          </footer>
        }
      </div>
    }
  `,
  styleUrl: './pf-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-dialog'
  }
})
export class PfDialog {
  readonly open = input(false);
  readonly title = input('Dialog');
  readonly closeOnBackdrop = input(true);
  readonly showFooter = input(true);

  readonly openChange = output<boolean>();

  close(): void {
    this.openChange.emit(false);
  }

  backdropClose(): void {
    if (this.closeOnBackdrop()) {
      this.close();
    }
  }
}
