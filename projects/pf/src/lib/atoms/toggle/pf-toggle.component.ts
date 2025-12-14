import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

@Component({
  selector: 'pf-toggle',
  template: `
    <button
      type="button"
      class="pf-toggle__control"
      [attr.aria-pressed]="isPressed()"
      [attr.aria-disabled]="disabled()"
      [disabled]="disabled()"
      [class]="controlClass()"
      (click)="toggle()"
    >
      <span [class]="thumbClass()"></span>
      <span class="pf-toggle__label">
        <ng-content />
        @if (label()) {
          <span class="pf-toggle__text">{{ label() }}</span>
        }
      </span>
    </button>
  `,
  styleUrl: './pf-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClass()',
    role: 'button',
    '(keydown)': 'handleKeydown($event)'
  }
})
export class PfToggle {
  readonly label = input<string | undefined>();
  readonly pressed = input<boolean | undefined>(undefined);
  readonly disabled = input(false);

  readonly pressedChange = output<boolean>();

  private readonly uncontrolled = signal(false);
  private readonly isControlled = computed(() => this.pressed() !== undefined);

  protected readonly isPressed = computed(() =>
    this.isControlled() ? Boolean(this.pressed()) : this.uncontrolled()
  );

  protected readonly hostClass = computed(() =>
    ['pf-toggle', this.isPressed() ? 'pf-toggle--on' : '', this.disabled() ? 'pf-toggle--disabled' : '']
      .filter(Boolean)
      .join(' ')
  );

  protected readonly controlClass = computed(() =>
    [
      'pf-toggle__control',
      this.isPressed() ? 'pf-toggle__control--on' : '',
      this.disabled() ? 'pf-toggle__control--disabled' : ''
    ]
      .filter(Boolean)
      .join(' ')
  );

  protected readonly thumbClass = computed(() =>
    [
      'pf-toggle__thumb',
      this.isPressed() ? 'pf-toggle__thumb--on' : '',
      this.disabled() ? 'pf-toggle__thumb--disabled' : ''
    ]
      .filter(Boolean)
      .join(' ')
  );

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  }

  toggle(): void {
    if (this.disabled()) {
      return;
    }

    const next = !this.isPressed();

    if (!this.isControlled()) {
      this.uncontrolled.set(next);
    }

    this.pressedChange.emit(next);
  }
}
