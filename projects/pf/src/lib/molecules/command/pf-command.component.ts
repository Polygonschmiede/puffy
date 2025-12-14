import { ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChildren, computed, input, output, signal } from '@angular/core';

type CommandItem = {
  label: string;
  value: string;
  shortcut?: string;
};

@Component({
  selector: 'pf-command',
  template: `
    @if (open()) {
      <div class="pf-command__backdrop" (click)="close()"></div>
      <section class="pf-command__panel" role="dialog" aria-modal="true">
        <header class="pf-command__header">
          <input
            #commandInput
            type="text"
            class="pf-command__input"
            [placeholder]="placeholder()"
            [value]="query()"
            (input)="onQuery($event)"
            (keydown)="onKeydown($event)"
          />
        </header>
        <ul class="pf-command__list" role="listbox">
          @if (!filteredItems().length) {
            <li class="pf-command__empty">Keine Treffer</li>
          } @else {
            @for (item of filteredItems(); track item.value; let idx = $index) {
              <li>
                <button
                  #optionBtn
                  type="button"
                  role="option"
                  class="pf-command__option"
                  [class.pf-command__option--active]="idx === activeIndex()"
                  [attr.aria-selected]="idx === activeIndex()"
                  (click)="select(item)"
                  (mousemove)="setActive(idx)"
                >
                  <span>{{ item.label }}</span>
                  @if (item.shortcut) {
                    <span class="pf-command__shortcut">{{ item.shortcut }}</span>
                  }
                </button>
              </li>
            }
          }
        </ul>
      </section>
    }
  `,
  styleUrl: './pf-command.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-command'
  }
})
export class PfCommand {
  readonly items = input.required<CommandItem[]>();
  readonly open = input(false);
  readonly placeholder = input('Suchen oder Befehl ausführen…');

  readonly openChange = output<boolean>();
  readonly selectCommand = output<string>();
  readonly queryChange = output<string>();

  @ViewChildren('optionBtn', { read: ElementRef })
  private readonly options!: QueryList<ElementRef<HTMLButtonElement>>;

  protected readonly query = signal('');
  protected readonly activeIndex = signal(0);

  protected readonly filteredItems = computed(() => {
    const term = this.query().toLowerCase().trim();
    if (!term) {
      return this.items();
    }
    return this.items().filter((item) => item.label.toLowerCase().includes(term));
  });

  onQuery(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.query.set(value);
    this.activeIndex.set(0);
    this.queryChange.emit(value);
  }

  setActive(index: number): void {
    this.activeIndex.set(index);
  }

  select(item: CommandItem): void {
    this.selectCommand.emit(item.value);
    this.close();
  }

  close(): void {
    this.openChange.emit(false);
  }

  onKeydown(event: KeyboardEvent): void {
    const list = this.filteredItems();
    if (!list.length) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.activeIndex.update((i) => (i + 1) % list.length);
      this.focusActive();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.activeIndex.update((i) => (i - 1 + list.length) % list.length);
      this.focusActive();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const item = list[this.activeIndex()];
      if (item) {
        this.select(item);
      }
    } else if (event.key === 'Escape') {
      this.close();
    }
  }

  private focusActive(): void {
    queueMicrotask(() => {
      const el = this.options?.get(this.activeIndex())?.nativeElement;
      el?.focus();
    });
  }
}
