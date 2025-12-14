import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

type CarouselItem = { title: string; description?: string };

@Component({
  selector: 'pf-carousel',
  template: `
    <div class="pf-carousel">
      <div class="pf-carousel__viewport">
        @for (item of items(); track item.title; let idx = $index) {
          <article
            class="pf-carousel__slide"
            [class.pf-carousel__slide--active]="idx === index()"
            [attr.aria-hidden]="idx === index() ? null : true"
          >
            <h4 class="pf-carousel__title">{{ item.title }}</h4>
            @if (item.description) {
              <p class="pf-carousel__description">{{ item.description }}</p>
            }
          </article>
        }
      </div>
      <div class="pf-carousel__controls">
        <button type="button" class="pf-carousel__control" (click)="prev()" aria-label="Vorherige Folie">‹</button>
        <div class="pf-carousel__dots">
          @for (item of items(); track item.title; let idx = $index) {
            <button
              type="button"
              class="pf-carousel__dot"
              [class.pf-carousel__dot--active]="idx === index()"
              (click)="goTo(idx)"
              [attr.aria-label]="'Gehe zu Folie ' + (idx + 1)"
            ></button>
          }
        </div>
        <button type="button" class="pf-carousel__control" (click)="next()" aria-label="Nächste Folie">›</button>
      </div>
    </div>
  `,
  styleUrl: './pf-carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-carousel__host'
  }
})
export class PfCarousel {
  readonly items = input.required<CarouselItem[]>();
  readonly activeIndex = input<number | undefined>(undefined);

  readonly activeIndexChange = output<number>();

  private readonly internalIndex = signal(0);
  private readonly isControlled = computed(() => this.activeIndex() !== undefined);

  protected readonly index = computed(() =>
    this.isControlled() ? Number(this.activeIndex()) : this.internalIndex()
  );

  prev(): void {
    this.setIndex(this.index() - 1);
  }

  next(): void {
    this.setIndex(this.index() + 1);
  }

  goTo(target: number): void {
    this.setIndex(target);
  }

  private setIndex(next: number): void {
    const length = this.items().length || 1;
    const wrapped = (next + length) % length;
    if (!this.isControlled()) {
      this.internalIndex.set(wrapped);
    }
    this.activeIndexChange.emit(wrapped);
  }
}
