import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { PfNavItem } from '../navigation/pf-navigation-menu.component';

@Component({
  selector: 'pf-menubar',
  imports: [],
  template: `
    <nav class="pf-menubar" aria-label="Menubar">
      <ul class="pf-menubar__list">
        @for (item of items(); track item.id) {
          <li class="pf-menubar__item">
            <button
              type="button"
              class="pf-menubar__trigger"
              [disabled]="item.disabled"
              (click)="select(item)"
            >
              {{ item.label }}
            </button>
          </li>
        }
      </ul>
    </nav>
  `,
  styleUrl: './pf-menubar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-menubar'
  }
})
export class PfMenubar {
  readonly items = input<PfNavItem[]>([]);
  readonly itemSelected = output<PfNavItem>();

  select(item: PfNavItem): void {
    if (item.disabled) {
      return;
    }
    this.itemSelected.emit(item);
  }
}
