import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'pf-image-fallback',
  imports: [NgOptimizedImage],
  template: `
    <img
      ngOptimizedImage
      [src]="currentSrc()"
      [alt]="alt()"
      [attr.width]="width()"
      [attr.height]="height()"
      (error)="useFallback()"
      class="pf-image-fallback__img"
    />
  `,
  styleUrl: './pf-image-fallback.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-image-fallback'
  }
})
export class PfImageFallback {
  readonly src = input.required<string>();
  readonly fallbackSrc = input<string | undefined>();
  readonly alt = input('');
  readonly width = input<number | undefined>(undefined);
  readonly height = input<number | undefined>(undefined);

  private readonly source = signal<string | undefined>(undefined);

  protected readonly currentSrc = computed(() => this.source() ?? this.src());

  useFallback(): void {
    if (this.fallbackSrc()) {
      this.source.set(this.fallbackSrc());
    }
  }
}
