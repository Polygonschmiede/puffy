import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'pf-aspect-ratio',
  template: `
    <div class="pf-aspect-ratio__inner" [style.aspectRatio]="ratioText()" [style.paddingTop]="paddingTop()">
      <div class="pf-aspect-ratio__content">
        <ng-content />
      </div>
    </div>
  `,
  styleUrl: './pf-aspect-ratio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': "'pf-aspect-ratio'"
  }
})
export class PfAspectRatio {
  readonly ratio = input(16 / 9);

  protected readonly ratioText = computed(() => {
    const value = this.ratio();
    return Number.isFinite(value) && value > 0 ? String(value) : 'auto';
  });

  protected readonly paddingTop = computed(() => {
    const value = this.ratio();
    if (!Number.isFinite(value) || value <= 0) {
      return '0';
    }
    return `${(1 / value) * 100}%`;
  });
}
