import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

@Component({
  selector: 'pf-slider',
  imports: [],
  template: `
    @if (label()) {
      <div class="pf-slider__meta">
        <span class="pf-slider__label">{{ label() }}</span>
        <span class="pf-slider__value">{{ currentValue() }}</span>
      </div>
    }
    <div class="pf-slider__track">
      <div class="pf-slider__fill" [style.width.%]="percentage()"></div>
      <input
        type="range"
        [min]="min()"
        [max]="max()"
        [step]="step()"
        [value]="currentValue()"
        [disabled]="disabled()"
        (input)="onInput($event)"
      />
    </div>
  `,
  styleUrl: './pf-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-slider'
  }
})
export class PfSlider {
  readonly min = input(0);
  readonly max = input(100);
  readonly step = input(1);
  readonly value = input<number | undefined>(undefined);
  readonly label = input<string | undefined>();
  readonly disabled = input(false);

  readonly valueChange = output<number>();

  private readonly uncontrolledValue = signal(0);

  protected readonly currentValue = computed(() => this.value() ?? this.uncontrolledValue());

  protected readonly percentage = computed(() => {
    const percent = ((this.currentValue() - this.min()) / (this.max() - this.min() || 1)) * 100;
    return Math.min(100, Math.max(0, percent));
  });

  onInput(event: Event): void {
    if (this.disabled()) {
      return;
    }

    const next = Number((event.target as HTMLInputElement | null)?.value ?? this.min());

    if (this.value() === undefined) {
      this.uncontrolledValue.set(next);
    }

    this.valueChange.emit(next);
  }
}
