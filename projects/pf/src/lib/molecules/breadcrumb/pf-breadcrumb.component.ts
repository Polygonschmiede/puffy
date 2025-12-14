import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

type BreadcrumbItem = {
  label: string;
  href?: string;
  ariaLabel?: string;
};

@Component({
  selector: 'pf-breadcrumb',
  template: `
    <nav class="pf-breadcrumb" [attr.aria-label]="ariaLabel()">
      <ol class="pf-breadcrumb__list">
        @for (item of leadingItems(); track item.label; let idx = $index) {
          <li class="pf-breadcrumb__item">
            <a
              class="pf-breadcrumb__link"
              [attr.href]="item.href"
              [attr.aria-label]="item.ariaLabel || item.label"
              [attr.aria-current]="isCurrent(idx, leadingItems().length + trailingItems().length)"
            >
              {{ item.label }}
            </a>
          </li>
        }

        @if (isCollapsed()) {
          <li class="pf-breadcrumb__item pf-breadcrumb__item--ellipsis">
            <button
              type="button"
              class="pf-breadcrumb__ellipsis"
              aria-label="Weitere Navigation öffnen"
              (click)="toggleMenu()"
            >
              …
            </button>
            @if (menuOpen()) {
              <ul class="pf-breadcrumb__popover">
                @for (item of collapsedItems(); track item.label; let offset = $index) {
                  <li>
                    <a
                      class="pf-breadcrumb__link"
                      [attr.href]="item.href"
                      [attr.aria-label]="item.ariaLabel || item.label"
                      [attr.aria-current]="isCurrent(offset + leadingItems().length, totalLength())"
                      (click)="closeMenu()"
                    >
                      {{ item.label }}
                    </a>
                  </li>
                }
              </ul>
            }
          </li>
        }

        @for (item of trailingItems(); track item.label; let idx = $index) {
          <li class="pf-breadcrumb__item">
            <a
              class="pf-breadcrumb__link"
              [attr.href]="item.href"
              [attr.aria-label]="item.ariaLabel || item.label"
              [attr.aria-current]="isCurrent(idx + leadingItems().length + (isCollapsed() ? 1 : 0), totalLength())"
            >
              {{ item.label }}
            </a>
          </li>
        }
      </ol>
    </nav>
  `,
  styleUrl: './pf-breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-breadcrumb__host'
  }
})
export class PfBreadcrumb {
  readonly items = input.required<BreadcrumbItem[]>();
  readonly maxVisible = input(4);
  readonly ariaLabel = input('Breadcrumb');

  protected readonly menuOpen = signal(false);

  protected readonly isCollapsed = computed(
    () => this.items().length > this.maxVisible() && this.maxVisible() >= 3
  );

  private readonly computedSlices = computed(() => {
    if (!this.isCollapsed()) {
      return {
        leading: this.items(),
        collapsed: [] as BreadcrumbItem[],
        trailing: [] as BreadcrumbItem[]
      };
    }

    const first = this.items()[0];
    const last = this.items()[this.items().length - 1];

    return {
      leading: [first],
      collapsed: this.items().slice(1, -1),
      trailing: [last]
    };
  });

  protected totalLength(): number {
    return this.items().length;
  }

  protected leadingItems(): BreadcrumbItem[] {
    return this.computedSlices().leading;
  }

  protected trailingItems(): BreadcrumbItem[] {
    return this.computedSlices().trailing;
  }

  protected collapsedItems(): BreadcrumbItem[] {
    return this.computedSlices().collapsed;
  }

  protected isCurrent(idx: number, total: number): 'page' | null {
    return idx === total - 1 ? 'page' : null;
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
