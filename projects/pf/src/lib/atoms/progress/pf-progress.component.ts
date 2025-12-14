import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'pf-progress',
  imports: [],
  template: `
    @if (label() || showValue()) {
      <div class="pf-progress__meta">
        @if (label()) {
          <span class="pf-progress__label">{{ label() }}</span>
        }
        @if (showValue()) {
          <span class="pf-progress__value">{{ percentage() }}%</span>
        }
      </div>
    }
    <div class="pf-progress__track">
      <div class="pf-progress__bar" [style.width.%]="percentage()"></div>
    </div>
  `,
  styleUrl: './pf-progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-progress'
  }
})
export class PfProgress {
  readonly value = input(0);
  readonly max = input(100);
  readonly label = input<string | undefined>();
  readonly showValue = input(false);

  protected readonly percentage = computed(() => {
    const percent = (this.value() / (this.max() || 1)) * 100;
    return Math.min(100, Math.max(0, Math.round(percent)));
  });
}
