import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'pf-pagination',
  imports: [],
  template: `
    <nav class="pf-pagination" aria-label="Pagination">
      <button type="button" class="pf-pagination__btn" [disabled]="page() <= 1" (click)="change(page() - 1)">
        Prev
      </button>
      <span class="pf-pagination__info">Page {{ page() }} / {{ totalPages() }}</span>
      <button
        type="button"
        class="pf-pagination__btn"
        [disabled]="page() >= totalPages()"
        (click)="change(page() + 1)"
      >
        Next
      </button>
    </nav>
  `,
  styleUrl: './pf-pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PfPagination {
  readonly page = input(1);
  readonly pageSize = input(10);
  readonly total = input(0);

  readonly pageChange = output<number>();

  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.total() / Math.max(1, this.pageSize())))
  );

  change(next: number): void {
    const clamped = Math.min(Math.max(next, 1), this.totalPages());
    if (clamped !== this.page()) {
      this.pageChange.emit(clamped);
    }
  }
}
