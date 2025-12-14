import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  computed,
  input,
  output,
  signal
} from '@angular/core';

type ToggleGroupItem = {
  label: string;
  value: string;
  disabled?: boolean;
};

@Component({
  selector: 'pf-toggle-group',
  template: `
    <div
      class="pf-toggle-group__list"
      role="group"
      [attr.aria-orientation]="orientation()"
      (keydown)="onKeydown($event)"
    >
      @for (item of items(); track item.value; let idx = $index) {
        <button
          #toggleButton
          type="button"
          class="pf-toggle-group__item"
          [class.pf-toggle-group__item--selected]="isSelected(item.value)"
          [class.pf-toggle-group__item--disabled]="isDisabled(item)"
          [attr.aria-pressed]="isSelected(item.value)"
          [attr.aria-disabled]="isDisabled(item)"
          [disabled]="isDisabled(item)"
          [tabIndex]="tabIndexFor(idx)"
          (click)="toggle(item.value)"
        >
          <span class="pf-toggle-group__thumb"></span>
          <span class="pf-toggle-group__label">{{ item.label }}</span>
        </button>
      }
    </div>
  `,
  styleUrl: './pf-toggle-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClass()',
    '[attr.aria-disabled]': 'disabled()'
  }
})
export class PfToggleGroup {
  readonly items = input.required<ToggleGroupItem[]>();
  readonly value = input<string | string[] | undefined>(undefined);
  readonly multiple = input(false);
  readonly disabled = input(false);
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');

  readonly valueChange = output<string | string[] | null>();

  @ViewChildren('toggleButton', { read: ElementRef })
  private readonly buttons!: QueryList<ElementRef<HTMLButtonElement>>;

  private readonly internalSelection = signal<Set<string>>(new Set());
  private readonly isControlled = computed(() => this.value() !== undefined);

  protected readonly hostClass = computed(() =>
    [
      'pf-toggle-group',
      `pf-toggle-group--${this.orientation()}`,
      this.disabled() ? 'pf-toggle-group--disabled' : ''
    ]
      .filter(Boolean)
      .join(' ')
  );

  private readonly selection = computed<Set<string>>(() => {
    const current = this.value();
    if (current === undefined) {
      return this.internalSelection();
    }

    if (Array.isArray(current)) {
      return new Set(current);
    }

    return current ? new Set([current]) : new Set();
  });

  protected isSelected(value: string): boolean {
    return this.selection().has(value);
  }

  protected isDisabled(item: ToggleGroupItem): boolean {
    return this.disabled() || Boolean(item.disabled);
  }

  protected tabIndexFor(index: number): number {
    const selectedIndex = this.items().findIndex((item) => this.isSelected(item.value));
    const firstFocusable = selectedIndex >= 0 ? selectedIndex : 0;
    return index === firstFocusable ? 0 : -1;
  }

  toggle(value: string): void {
    if (this.disabled()) {
      return;
    }

    const next = new Set(this.selection());
    const allowMultiple = this.multiple();

    if (allowMultiple) {
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
    } else {
      if (next.has(value)) {
        next.clear();
      } else {
        next.clear();
        next.add(value);
      }
    }

    if (!this.isControlled()) {
      this.internalSelection.set(next);
    }

    const payload = allowMultiple ? Array.from(next) : next.values().next().value ?? null;
    this.valueChange.emit(payload as string | string[] | null);
  }

  onKeydown(event: KeyboardEvent): void {
    const keys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];
    if (!keys.includes(event.key)) {
      return;
    }

    event.preventDefault();
    const list = this.buttons?.toArray() ?? [];
    if (!list.length) {
      return;
    }

    const currentIndex = list.findIndex((ref) => ref.nativeElement === event.target);
    const orientation = this.orientation();
    const forward = event.key === 'ArrowRight' || event.key === 'ArrowDown';

    if (orientation === 'vertical' && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      return;
    }

    const nextIndex =
      currentIndex === -1
        ? 0
        : (currentIndex + (forward ? 1 : -1) + list.length) % list.length;

    list[nextIndex]?.nativeElement.focus();
  }
}
