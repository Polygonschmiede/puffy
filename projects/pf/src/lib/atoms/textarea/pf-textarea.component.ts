import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

let pfTextareaId = 0;

@Component({
  selector: 'pf-textarea',
  imports: [],
  template: `
    <label class="pf-textarea__wrapper" [attr.for]="textareaId">
      @if (label()) {
        <span class="pf-textarea__label">{{ label() }}</span>
      }
      <textarea
        [id]="textareaId"
        [placeholder]="placeholder() ?? ''"
        [value]="currentValue()"
        [disabled]="disabled()"
        [attr.rows]="rows()"
        [attr.aria-invalid]="error() ? 'true' : null"
        class="pf-textarea__control"
        (input)="onInput($event)"
      ></textarea>
      @if (error()) {
        <span class="pf-textarea__error">{{ error() }}</span>
      }
    </label>
  `,
  styleUrl: './pf-textarea.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-textarea'
  }
})
export class PfTextarea {
  readonly label = input<string | undefined>();
  readonly error = input<string | undefined>();
  readonly placeholder = input<string | undefined>();
  readonly rows = input<number>(4);
  readonly value = input<string | undefined>(undefined);
  readonly disabled = input(false);

  readonly valueChange = output<string>();

  private readonly uncontrolledValue = signal('');
  protected readonly currentValue = computed(() => this.value() ?? this.uncontrolledValue());
  protected readonly textareaId = `pf-textarea-${++pfTextareaId}`;

  onInput(event: Event): void {
    if (this.disabled()) {
      return;
    }

    const target = event.target as HTMLTextAreaElement | null;
    const next = target?.value ?? '';

    if (this.value() === undefined) {
      this.uncontrolledValue.set(next);
    }

    this.valueChange.emit(next);
  }
}
