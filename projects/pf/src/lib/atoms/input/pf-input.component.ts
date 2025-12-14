import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

let pfInputId = 0;

@Component({
  selector: 'pf-input',
  imports: [],
  template: `
    <label class="pf-input__wrapper" [attr.for]="inputId">
      @if (label()) {
        <span class="pf-input__label">{{ label() }}</span>
      }
      <input
        [id]="inputId"
        [type]="type()"
        [placeholder]="placeholder() ?? ''"
        [value]="currentValue()"
        [disabled]="disabled()"
        [attr.aria-invalid]="error() ? 'true' : null"
        class="pf-input__control"
        (input)="onInput($event)"
      />
      @if (error()) {
        <span class="pf-input__error">{{ error() }}</span>
      }
    </label>
  `,
  styleUrl: './pf-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-input'
  }
})
export class PfInput {
  readonly label = input<string | undefined>();
  readonly error = input<string | undefined>();
  readonly placeholder = input<string | undefined>();
  readonly type = input<string>('text');
  readonly value = input<string | undefined>(undefined);
  readonly disabled = input(false);

  readonly valueChange = output<string>();

  private readonly uncontrolledValue = signal('');
  protected readonly currentValue = computed(() => this.value() ?? this.uncontrolledValue());
  protected readonly inputId = `pf-input-${++pfInputId}`;

  onInput(event: Event): void {
    if (this.disabled()) {
      return;
    }

    const target = event.target as HTMLInputElement | null;
    const next = target?.value ?? '';

    if (this.value() === undefined) {
      this.uncontrolledValue.set(next);
    }

    this.valueChange.emit(next);
  }
}
