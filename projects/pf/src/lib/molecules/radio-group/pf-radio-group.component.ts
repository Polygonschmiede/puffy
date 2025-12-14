import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  output,
  signal,
  viewChildren
} from '@angular/core';

type RadioItem = {
  label: string;
  value: string;
  disabled?: boolean;
};

@Component({
  selector: 'pf-radio-group',
  template: `
    <div
      class="pf-radio-group__list"
      role="radiogroup"
      [attr.aria-orientation]="orientation()"
      (keydown)="onKeydown($event)"
    >
      @for (item of items(); track item.value; let idx = $index) {
        <button
          #radioBtn
          type="button"
          class="pf-radio-group__item"
          [class.pf-radio-group__item--selected]="isSelected(item.value)"
          [class.pf-radio-group__item--disabled]="isDisabled(item)"
          role="radio"
          [attr.aria-checked]="isSelected(item.value)"
          [attr.aria-disabled]="isDisabled(item)"
          [disabled]="isDisabled(item)"
          [tabIndex]="tabIndexFor(idx)"
          (click)="select(item.value)"
        >
          <span class="pf-radio-group__bullet" [class.pf-radio-group__bullet--selected]="isSelected(item.value)"></span>
          <span class="pf-radio-group__label">{{ item.label }}</span>
        </button>
      }
    </div>
  `,
  styleUrl: './pf-radio-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClass()'
  }
})
export class PfRadioGroup {
  readonly items = input.required<RadioItem[]>();
  readonly value = input<string | undefined>(undefined);
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly disabled = input(false);

  readonly valueChange = output<string>();

  private readonly buttons = viewChildren('radioBtn', { read: ElementRef });

  private readonly uncontrolled = signal<string | undefined>(undefined);
  private readonly isControlled = computed(() => this.value() !== undefined);

  protected readonly hostClass = computed(() =>
    ['pf-radio-group', `pf-radio-group--${this.orientation()}`, this.disabled() ? 'pf-radio-group--disabled' : '']
      .filter(Boolean)
      .join(' ')
  );

  protected readonly currentValue = computed(() =>
    this.isControlled() ? this.value() : this.uncontrolled()
  );

  protected isSelected(value: string): boolean {
    return this.currentValue() === value;
  }

  protected isDisabled(item: RadioItem): boolean {
    return this.disabled() || Boolean(item.disabled);
  }

  protected tabIndexFor(index: number): number {
    const selectedIndex = this.items().findIndex((item) => this.isSelected(item.value));
    const focusIndex = selectedIndex >= 0 ? selectedIndex : 0;
    return index === focusIndex ? 0 : -1;
  }

  select(value: string): void {
    if (this.disabled()) {
      return;
    }

    if (!this.isControlled()) {
      this.uncontrolled.set(value);
    }

    this.valueChange.emit(value);
  }

  onKeydown(event: KeyboardEvent): void {
    const keys = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];
    if (!keys.includes(event.key)) {
      return;
    }

    const list = this.buttons ?? [];
    if (!list.length) {
      return;
    }

    const forward = event.key === 'ArrowRight' || event.key === 'ArrowDown';
    if (this.orientation() === 'vertical' && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
      return;
    }

    const currentIndex = list().findIndex((ref) => ref.nativeElement === event.target);
    const nextIndex =
      currentIndex === -1
        ? 0
        : (currentIndex + (forward ? 1 : -1) + list.length) % list.length;

    list()[nextIndex]?.nativeElement.focus();
  }
}
