import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

@Component({
  selector: 'pf-switch',
  imports: [],
  template: `
    <button
      type="button"
      role="switch"
      [attr.aria-checked]="isChecked()"
      [attr.aria-disabled]="disabled()"
      [disabled]="disabled()"
      [class]="trackClass()"
      (click)="toggle()"
    >
      <span [class]="thumbClass()"></span>
      @if (isChecked()) {
        <span class="pf-switch__glow"></span>
      }
    </button>
    @if (label()) {
      <span class="pf-switch__label">{{ label() }}</span>
    }
  `,
  styleUrl: './pf-switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'switchClass()'
  }
})
export class PfSwitch {
  readonly label = input<string | undefined>();
  readonly checked = input<boolean | undefined>(undefined);
  readonly disabled = input(false);

  readonly checkedChange = output<boolean>();

  private readonly uncontrolled = signal(false);
  private readonly isControlled = computed(() => this.checked() !== undefined);

  protected readonly isChecked = computed(() =>
    this.isControlled() ? Boolean(this.checked()) : this.uncontrolled()
  );

  protected readonly switchClass = computed(() =>
    ['pf-switch', this.disabled() ? 'pf-switch--disabled' : ''].filter(Boolean).join(' ')
  );

  protected readonly trackClass = computed(() =>
    [
      'pf-switch__track',
      this.isChecked() ? 'pf-switch__track--checked' : '',
      this.disabled() ? 'pf-switch__track--disabled' : ''
    ]
      .filter(Boolean)
      .join(' ')
  );

  protected readonly thumbClass = computed(() =>
    [
      'pf-switch__thumb',
      this.isChecked() ? 'pf-switch__thumb--checked' : '',
      this.disabled() ? 'pf-switch__thumb--disabled' : ''
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
