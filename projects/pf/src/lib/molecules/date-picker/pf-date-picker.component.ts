import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { PfCalendar } from '../calendar/pf-calendar.component';

@Component({
  selector: 'pf-date-picker',
  imports: [PfCalendar],
  template: `
    <div class="pf-date-picker__wrapper">
      <button
        type="button"
        class="pf-date-picker__trigger"
        [attr.aria-expanded]="open()"
        (click)="toggle()"
      >
        {{ displayValue() || placeholder() }}
      </button>
      @if (open()) {
        <div class="pf-date-picker__popover">
          <pf-calendar [value]="value()" (valueChange)="onSelect($event)"></pf-calendar>
        </div>
      }
    </div>
  `,
  styleUrl: './pf-date-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-date-picker'
  }
})
export class PfDatePicker {
  readonly value = input<string | Date | null | undefined>(undefined);
  readonly placeholder = input('Datum wählen');

  readonly valueChange = output<string>();

  protected readonly open = signal(false);

  protected readonly displayValue = computed(() => {
    const val = this.value();
    if (!val) {
      return '';
    }
    const date = val instanceof Date ? val : new Date(val);
    return date.toLocaleDateString();
  });

  toggle(): void {
    this.open.update((o) => !o);
  }

  onSelect(iso: string): void {
    this.valueChange.emit(iso);
    this.open.set(false);
  }
}
