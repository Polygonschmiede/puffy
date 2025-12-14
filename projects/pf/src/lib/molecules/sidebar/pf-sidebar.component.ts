import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { PfNavItem } from '../navigation/pf-navigation-menu.component';

@Component({
  selector: 'pf-sidebar',
  imports: [],
  template: `
    <aside class="pf-sidebar" [class.pf-sidebar--collapsed]="collapsed()">
      <header class="pf-sidebar__header">
        <span class="pf-sidebar__title">{{ title() }}</span>
        <button type="button" class="pf-sidebar__toggle" (click)="toggle()">
          {{ collapsed() ? '›' : '‹' }}
        </button>
      </header>
      <nav class="pf-sidebar__nav">
        @for (item of items(); track item.id) {
          <button
            type="button"
            class="pf-sidebar__item"
            [class.pf-sidebar__item--disabled]="item.disabled"
            (click)="select(item)"
          >
            {{ item.label }}
          </button>
        }
      </nav>
    </aside>
  `,
  styleUrl: './pf-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-sidebar'
  }
})
export class PfSidebar {
  readonly title = input('Menu');
  readonly items = input<PfNavItem[]>([]);

  readonly itemSelected = output<PfNavItem>();
  protected readonly collapsed = signal(false);

  toggle(): void {
    this.collapsed.update((value) => !value);
  }

  select(item: PfNavItem): void {
    if (item.disabled) {
      return;
    }
    this.itemSelected.emit(item);
  }
}
