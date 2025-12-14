import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

@Component({
  selector: 'pf-checkbox',
  imports: [],
  template: `
    <button
      type="button"
      role="checkbox"
      [attr.aria-checked]="isChecked()"
      [attr.aria-disabled]="disabled()"
      [disabled]="disabled()"
      [class]="boxClass()"
      (click)="toggle()"
    >
      @if (isChecked()) {
        <span class="pf-checkbox__check">✓</span>
      }
    </button>
    @if (label()) {
      <span class="pf-checkbox__label" (click)="toggle()">{{ label() }}</span>
    }
  `,
  styleUrl: './pf-checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-checkbox'
  }
})
export class PfCheckbox {
  readonly label = input<string | undefined>();
  readonly checked = input<boolean | undefined>(undefined);
  readonly disabled = input(false);

  readonly checkedChange = output<boolean>();

  private readonly uncontrolled = signal(false);
  private readonly isControlled = computed(() => this.checked() !== undefined);

  protected readonly isChecked = computed(() =>
    this.isControlled() ? Boolean(this.checked()) : this.uncontrolled()
  );

  protected readonly boxClass = computed(() =>
    [
      'pf-checkbox__box',
      this.isChecked() ? 'pf-checkbox__box--checked' : '',
      this.disabled() ? 'pf-checkbox__box--disabled' : ''
    ]
      .filter(Boolean)
      .join(' ')
  );

  toggle(): void {
    if (this.disabled()) {
      return;
    }

    const next = !this.isChecked();

    if (!this.isControlled()) {
      this.uncontrolled.set(next);
    }

    this.checkedChange.emit(next);
  }
}
