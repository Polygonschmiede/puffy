import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

@Component({
  selector: 'pf-radio',
  imports: [],
  template: `
    <button
      type="button"
      role="radio"
      [attr.aria-checked]="isChecked()"
      [attr.aria-disabled]="disabled()"
      [disabled]="disabled()"
      [class]="radioClass()"
      (click)="select()"
    >
      @if (isChecked()) {
        <span class="pf-radio__dot"></span>
      }
    </button>
    @if (label()) {
      <span class="pf-radio__label" (click)="select()">{{ label() }}</span>
    }
  `,
  styleUrl: './pf-radio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-radio'
  }
})
export class PfRadio {
  readonly label = input<string | undefined>();
  readonly value = input<string | undefined>();
  readonly checked = input<boolean | undefined>(undefined);
  readonly disabled = input(false);

  readonly checkedChange = output<boolean>();

  private readonly uncontrolled = signal(false);
  private readonly isControlled = computed(() => this.checked() !== undefined);

  protected readonly isChecked = computed(() =>
    this.isControlled() ? Boolean(this.checked()) : this.uncontrolled()
  );

  protected readonly radioClass = computed(() =>
    [
      'pf-radio__control',
      this.isChecked() ? 'pf-radio__control--checked' : '',
      this.disabled() ? 'pf-radio__control--disabled' : ''
    ]
      .filter(Boolean)
      .join(' ')
  );

  select(): void {
    if (this.disabled() || this.isChecked()) {
      return;
    }

    if (!this.isControlled()) {
      this.uncontrolled.set(true);
    }

    this.checkedChange.emit(true);
  }
}
