import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type PfAlertVariant = 'info' | 'success' | 'warning' | 'destructive';

@Component({
  selector: 'pf-alert',
  imports: [],
  template: `
    <div class="pf-alert__icon" [attr.aria-hidden]="true">{{ iconSymbol() }}</div>
    <div class="pf-alert__body">
      @if (title()) {
        <div class="pf-alert__title">{{ title() }}</div>
      }
      <div class="pf-alert__content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrl: './pf-alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'alertClass()',
    role: 'status'
  }
})
export class PfAlert {
  readonly variant = input<PfAlertVariant>('info');
  readonly title = input<string | undefined>();

  protected readonly alertClass = computed(() => `pf-alert pf-alert--${this.variant()}`);

  protected readonly iconSymbol = computed(() => {
    switch (this.variant()) {
      case 'success':
        return '✓';
      case 'warning':
        return '!';
      case 'destructive':
        return '×';
      default:
        return 'ℹ';
    }
  });
}
