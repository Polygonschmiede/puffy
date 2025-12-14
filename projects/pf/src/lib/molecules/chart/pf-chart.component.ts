import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

type ChartDatum = { label: string; value: number; tone?: 'default' | 'accent' | 'danger' };

@Component({
  selector: 'pf-chart',
  template: `
    <div class="pf-chart" role="img" [attr.aria-label]="ariaLabel()">
      @for (item of data(); track item.label) {
        <div class="pf-chart__row">
          <span class="pf-chart__label">{{ item.label }}</span>
          <div class="pf-chart__bar-track">
            <div
              class="pf-chart__bar"
              [class]="'pf-chart__bar pf-chart__bar--' + (item.tone ?? 'default')"
              [style.width.%]="percentage(item.value)"
            ></div>
          </div>
          <span class="pf-chart__value">{{ item.value }}</span>
        </div>
      }
    </div>
  `,
  styleUrl: './pf-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-chart__host'
  }
})
export class PfChart {
  readonly data = input.required<ChartDatum[]>();
  readonly ariaLabel = input('Chart');

  private readonly max = computed(() => Math.max(...this.data().map((d) => d.value), 1));

  percentage(value: number): number {
    return Math.min(100, (value / this.max()) * 100);
  }
}
