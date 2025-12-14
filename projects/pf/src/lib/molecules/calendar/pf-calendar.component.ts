import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

type CalendarDay = {
  date: Date;
  label: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  iso: string;
};

@Component({
  selector: 'pf-calendar',
  template: `
    <section class="pf-calendar" role="grid">
      <header class="pf-calendar__header">
        <button type="button" class="pf-calendar__nav" (click)="prevMonth()" aria-label="Vorheriger Monat">‹</button>
        <div class="pf-calendar__title">{{ monthLabel() }}</div>
        <button type="button" class="pf-calendar__nav" (click)="nextMonth()" aria-label="Nächster Monat">›</button>
      </header>

      <div class="pf-calendar__weekdays" role="row">
        @for (day of weekdays(); track day) {
          <div class="pf-calendar__weekday" role="columnheader">{{ day }}</div>
        }
      </div>

      <div class="pf-calendar__grid" role="rowgroup">
        @for (day of days(); track day.iso) {
          <button
            type="button"
            role="gridcell"
            class="pf-calendar__day"
            [class.pf-calendar__day--outside]="!day.isCurrentMonth"
            [class.pf-calendar__day--today]="day.isToday"
            [class.pf-calendar__day--selected]="day.iso === selectedIso()"
            [attr.aria-selected]="day.iso === selectedIso()"
            (click)="select(day)"
          >
            {{ day.label }}
          </button>
        }
      </div>
    </section>
  `,
  styleUrl: './pf-calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-calendar__host'
  }
})
export class PfCalendar {
  readonly value = input<string | Date | null | undefined>(undefined);
  readonly weekStartsOn = input<0 | 1>(1);

  readonly valueChange = output<string>();

  protected readonly displayMonth = signal(this.initialMonth());

  protected readonly selectedIso = computed(() => {
    const val = this.value();
    if (!val) {
      return null;
    }
    const date = val instanceof Date ? val : new Date(val);
    return this.formatIso(date);
  });

  protected readonly monthLabel = computed(() =>
    this.displayMonth().toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
  );

  protected readonly weekdays = computed(() => {
    const base = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
    return this.weekStartsOn() === 1 ? base : ['So', ...base.slice(0, 6)];
  });

  protected readonly days = computed<CalendarDay[]>(() => {
    const current = this.displayMonth();
    const year = current.getFullYear();
    const month = current.getMonth();
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    const startOffset = this.getOffset(start.getDay());
    const total = startOffset + end.getDate();
    const cells = Math.ceil(total / 7) * 7;

    return Array.from({ length: cells }, (_, idx) => {
      const dayNum = idx - startOffset + 1;
      const date = new Date(year, month, dayNum);
      const isCurrentMonth = dayNum >= 1 && dayNum <= end.getDate();
      const todayIso = this.formatIso(new Date());
      return {
        date,
        label: date.getDate(),
        isCurrentMonth,
        isToday: this.formatIso(date) === todayIso,
        iso: this.formatIso(date)
      };
    });
  });

  select(day: CalendarDay): void {
    this.valueChange.emit(day.iso);
  }

  prevMonth(): void {
    const month = this.displayMonth();
    this.displayMonth.set(new Date(month.getFullYear(), month.getMonth() - 1, 1));
  }

  nextMonth(): void {
    const month = this.displayMonth();
    this.displayMonth.set(new Date(month.getFullYear(), month.getMonth() + 1, 1));
  }

  private getOffset(dayOfWeek: number): number {
    const weekStartsOn = this.weekStartsOn();
    const normalized = (dayOfWeek + 6) % 7; // convert Sun=0 to Mon=0
    return weekStartsOn === 1 ? normalized : dayOfWeek;
  }

  private initialMonth(): Date {
    const val = this.value();
    if (val) {
      const date = val instanceof Date ? val : new Date(val);
      return new Date(date.getFullYear(), date.getMonth(), 1);
    }
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }

  private formatIso(date: Date): string {
    return date.toISOString().slice(0, 10);
  }
}
