import { ChangeDetectionStrategy, Component, HostListener, input, output, signal } from '@angular/core';
import { PfDropdownItem } from '../dropdown/pf-dropdown.types';

@Component({
  selector: 'pf-context-menu',
  imports: [],
  template: `
    <div class="pf-context-menu__area" (contextmenu)="openMenu($event)">
      <ng-content></ng-content>
    </div>
    @if (open()) {
      <div class="pf-context-menu__panel" [style.top.px]="position().y" [style.left.px]="position().x">
        @for (item of items(); track item.id) {
          @if (item.dividerAbove) {
            <div class="pf-context-menu__divider" role="separator"></div>
          }
          <button
            type="button"
            class="pf-context-menu__item"
            [class.pf-context-menu__item--destructive]="item.destructive"
            [disabled]="item.disabled"
            (click)="select(item)"
          >
            {{ item.label }}
          </button>
        }
      </div>
    }
  `,
  styleUrl: './pf-context-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-context-menu'
  }
})
export class PfContextMenu {
  readonly items = input<PfDropdownItem[]>([]);
  readonly itemSelected = output<PfDropdownItem>();
  readonly openChange = output<boolean>();

  protected readonly open = signal(false);
  protected readonly position = signal({ x: 0, y: 0 });

  openMenu(event: MouseEvent): void {
    event.preventDefault();
    this.position.set({ x: event.clientX, y: event.clientY });
    this.open.set(true);
    this.openChange.emit(true);
  }

  select(item: PfDropdownItem): void {
    if (item.disabled) {
      return;
    }
    this.itemSelected.emit(item);
    this.open.set(false);
    this.openChange.emit(false);
  }

  @HostListener('document:click')
  handleOutside(): void {
    if (this.open()) {
      this.open.set(false);
      this.openChange.emit(false);
    }
  }
}
