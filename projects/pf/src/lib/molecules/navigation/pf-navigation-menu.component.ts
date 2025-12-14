import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

export type PfNavItem = {
  id: string;
  label: string;
  href?: string;
  children?: PfNavItem[];
  disabled?: boolean;
};

@Component({
  selector: 'pf-navigation-menu',
  imports: [],
  template: `
    <nav class="pf-navigation" aria-label="Primary navigation">
      <ul class="pf-navigation__list">
        @for (item of items(); track item.id) {
          <li class="pf-navigation__item" [class.pf-navigation__item--open]="isOpen(item.id)">
            <button
              type="button"
              class="pf-navigation__trigger"
              [disabled]="item.disabled"
              (click)="toggle(item.id, item.disabled)"
            >
              {{ item.label }}
            </button>
            @if (item.children?.length && isOpen(item.id)) {
              <div class="pf-navigation__panel">
                @for (child of item.children; track child.id) {
                  <a
                    class="pf-navigation__link"
                    [attr.href]="child.href ?? '#'"
                    [class.pf-navigation__link--disabled]="child.disabled"
                    (click)="select(child)"
                  >
                    {{ child.label }}
                  </a>
                }
              </div>
            }
          </li>
        }
      </ul>
    </nav>
  `,
  styleUrl: './pf-navigation-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-navigation-menu'
  }
})
export class PfNavigationMenu {
  readonly items = input<PfNavItem[]>([]);
  readonly itemSelected = output<PfNavItem>();

  private readonly openId = signal<string | null>(null);

  protected isOpen = (id: string) => this.openId() === id;

  toggle(id: string, disabled?: boolean): void {
    if (disabled) {
      return;
    }
    this.openId.set(this.openId() === id ? null : id);
  }

  select(item: PfNavItem): void {
    if (item.disabled) {
      return;
    }
    this.itemSelected.emit(item);
    this.openId.set(null);
  }
}
