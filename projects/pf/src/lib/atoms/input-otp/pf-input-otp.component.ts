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

@Component({
  selector: 'pf-input-otp',
  template: `
    <div class="pf-input-otp__cells" role="group">
      @for (idx of cellIndexes(); track idx) {
        <input
          #otpInput
          class="pf-input-otp__cell"
          [value]="cells()[idx]"
          [disabled]="disabled()"
          inputmode="numeric"
          pattern="[0-9]*"
          maxlength="1"
          autocomplete="one-time-code"
          (input)="onInput($event, idx)"
          (keydown)="onKeydown($event, idx)"
          (paste)="onPaste($event)"
        />
      }
    </div>
  `,
  styleUrl: './pf-input-otp.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': "'pf-input-otp'"
  }
})
export class PfInputOtp {
  readonly length = input(6);
  readonly value = input<string | undefined>(undefined);
  readonly disabled = input(false);

  readonly valueChange = output<string>();

  private readonly inputs = viewChildren('otpInput', { read: ElementRef });

  private readonly internal = signal<string[]>([]);
  private readonly isControlled = computed(() => this.value() !== undefined);

  protected readonly cellIndexes = computed(() => Array.from({ length: this.length() }, (_, i) => i));

  protected readonly cells = computed(() => {
    const len = this.length();
    const base = Array.from({ length: len }, () => '');
    const source = (this.isControlled() ? this.value() ?? '' : this.internal().join('')).slice(0, len);
    source.split('').forEach((char, idx) => {
      if (idx < len) {
        base[idx] = char;
      }
    });
    return base;
  });

  private updateValue(next: string[]): void {
    if (!this.isControlled()) {
      this.internal.set(next);
    }
    this.valueChange.emit(next.join(''));
  }

  onInput(event: Event, index: number): void {
    const target = event.target as HTMLInputElement;
    const raw = target.value;
    const char = raw.slice(-1);
    const next = [...this.cells()];
    next[index] = char;
    this.updateValue(next);

    if (char && index < this.length() - 1) {
      this.focusIndex(index + 1);
    }
  }

  onKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault();
      const next = [...this.cells()];
      next[index] = '';
      this.updateValue(next);
      if (event.key === 'Backspace' && index > 0) {
        this.focusIndex(index - 1);
      }
      return;
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focusIndex(index - 1);
    } else if (event.key === 'ArrowRight' && index < this.length() - 1) {
      event.preventDefault();
      this.focusIndex(index + 1);
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const text = event.clipboardData?.getData('text') ?? '';
    if (!text) {
      return;
    }
    const len = this.length();
    const next = Array.from({ length: len }, (_, idx) => text[idx] ?? this.cells()[idx] ?? '');
    this.updateValue(next);
    this.focusIndex(Math.min(text.length, len - 1));
  }

  private focusIndex(index: number): void {
    const el = this.inputs()?.at(index)?.nativeElement;
    el?.focus();
    el?.select();
  }
}
