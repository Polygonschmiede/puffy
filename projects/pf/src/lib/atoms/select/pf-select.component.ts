import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

export type PfSelectOption = { value: string; label: string };

@Component({
  selector: 'pf-select',
  imports: [],
  template: `
    <label class="pf-select__wrapper" [attr.for]="selectId">
      @if (label()) {
        <span class="pf-select__label">{{ label() }}</span>
      }
      <select
        [id]="selectId"
        class="pf-select__control"
        [disabled]="disabled()"
        [value]="currentValue() ?? ''"
        (change)="onChange($event)"
      >
        @if (placeholder()) {
          <option value="" disabled [selected]="!currentValue()">{{ placeholder() }}</option>
        }
        @for (option of options(); track option.value) {
          <option [value]="option.value">{{ option.label }}</option>
        }
      </select>
    </label>
  `,
  styleUrl: './pf-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-select'
  }
})
export class PfSelect {
  readonly label = input<string | undefined>();
  readonly placeholder = input<string | undefined>('Select...');
  readonly options = input<PfSelectOption[]>([]);
  readonly value = input<string | undefined>(undefined);
  readonly disabled = input(false);

  readonly valueChange = output<string>();

  private readonly uncontrolledValue = signal<string | undefined>(undefined);
  protected readonly currentValue = computed(() => this.value() ?? this.uncontrolledValue());
  protected readonly selectId = `pf-select-${Math.random().toString(36).slice(2, 8)}`;

  onChange(event: Event): void {
    if (this.disabled()) {
      return;
    }

    const next = (event.target as HTMLSelectElement | null)?.value ?? '';
    if (this.value() === undefined) {
      this.uncontrolledValue.set(next);
    }
    this.valueChange.emit(next);
  }
}
