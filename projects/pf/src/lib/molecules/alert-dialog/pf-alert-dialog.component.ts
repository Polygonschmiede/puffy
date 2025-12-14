import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'pf-alert-dialog',
  imports: [],
  template: `
    <button type="button" class="pf-alert-dialog__trigger" (click)="openDialog()">
      {{ triggerLabel() }}
    </button>

    @if (open()) {
      <div class="pf-alert-dialog__backdrop"></div>
      <div class="pf-alert-dialog__panel" role="alertdialog" aria-modal="true">
        <h3 class="pf-alert-dialog__title">{{ title() }}</h3>
        <p class="pf-alert-dialog__description">
          <ng-content />
        </p>
        <div class="pf-alert-dialog__actions">
          <button type="button" class="pf-alert-dialog__button pf-alert-dialog__button--ghost" (click)="cancel()">
            {{ cancelLabel() }}
          </button>
          <button type="button" class="pf-alert-dialog__button" (click)="confirm()">
            {{ confirmLabel() }}
          </button>
        </div>
      </div>
    }
  `,
  styleUrl: './pf-alert-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-alert-dialog',
    '(document:keydown.escape)': 'onEscape($event)'
  }
})
export class PfAlertDialog {
  readonly triggerLabel = input('Open alert');
  readonly title = input('Are you sure?');
  readonly cancelLabel = input('Cancel');
  readonly confirmLabel = input('Confirm');

  readonly confirmed = output<void>();
  readonly cancelled = output<void>();
  readonly openChange = output<boolean>();

  protected readonly open = signal(false);

  openDialog(): void {
    this.open.set(true);
    this.openChange.emit(true);
  }

  onEscape(event: Event): void {
    if (!this.open()) {
      return;
    }
    event.preventDefault();
    this.cancel();
  }

  confirm(): void {
    this.confirmed.emit();
    this.open.set(false);
    this.openChange.emit(false);
  }

  cancel(): void {
    this.cancelled.emit();
    this.open.set(false);
    this.openChange.emit(false);
  }
}
