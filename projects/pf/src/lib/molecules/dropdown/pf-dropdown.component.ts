import { ChangeDetectionStrategy, Component, HostListener, computed, input, output, signal } from '@angular/core';
import { PfDropdownItem } from './pf-dropdown.types';

@Component({
  selector: 'pf-dropdown',
  imports: [],
  template: `
    <button
      type="button"
      class="pf-dropdown__trigger"
      [attr.aria-expanded]="open()"
      [attr.aria-haspopup]="'menu'"
      (click)="toggle()"
    >
      {{ label() }}
      <span class="pf-dropdown__chevron" [class.open]="open()">⌄</span>
    </button>

    @if (open()) {
      <div class="pf-dropdown__panel" role="menu">
        @for (item of items(); track item.id) {
          @if (item.dividerAbove) {
            <div class="pf-dropdown__divider" role="separator"></div>
          }
          <button
            type="button"
            class="pf-dropdown__item"
            [class.pf-dropdown__item--destructive]="item.destructive"
            [disabled]="item.disabled"
            role="menuitem"
            (click)="select(item)"
          >
            {{ item.label }}
          </button>
        }
      </div>
    }
  `,
  styleUrl: './pf-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-dropdown'
  }
})
export class PfDropdown {
  readonly label = input('Menu');
  readonly items = input<PfDropdownItem[]>([]);

  readonly itemSelected = output<PfDropdownItem>();
  readonly openChange = output<boolean>();

  protected readonly open = signal(false);

  protected readonly activeItems = computed(() => this.items());

  toggle(): void {
    const next = !this.open();
    this.open.set(next);
    this.openChange.emit(next);
  }

  select(item: PfDropdownItem): void {
    if (item.disabled) {
      return;
    }
    this.itemSelected.emit(item);
    this.open.set(false);
    this.openChange.emit(false);
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: Event): void {
    if (!this.open()) {
      return;
    }
    event.preventDefault();
    this.open.set(false);
    this.openChange.emit(false);
  }
}
