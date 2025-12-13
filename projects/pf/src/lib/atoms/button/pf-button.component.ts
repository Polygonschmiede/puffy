import {Component, computed, input} from '@angular/core';

export type PfButtonVariant = 'primary' | 'ghost' | 'flat';
export type PfButtonTone = 'accent' | 'neutral';
export type PfButtonSize = 'sm' | 'md' | 'lg';
export type PfButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'pf-button',
  imports: [],
  template: `
    <button
      [attr.type]="type()"
      [disabled]="disabled()"
      [class]="buttonClass()"
    >
      <span class="pf-button__label">{{ label() }}</span>
    </button>
  `,
  styleUrl: './pf-button.component.scss',
  host: {
    class: 'pf-button'
  }
})
export class PfButton {
  readonly label = input.required<string>();
  readonly variant = input<PfButtonVariant>('primary');
  readonly tone = input<PfButtonTone>('accent');
  readonly size = input<PfButtonSize>('md');
  readonly disabled = input(false);
  readonly fullWidth = input(false);
  readonly type = input<PfButtonType>('button');

  protected readonly buttonClass = computed(() => {
    const classes = [
      'pf-button__control',
      `pf-button--${this.variant()}`,
      `pf-button--${this.tone()}`,
      `pf-button--${this.size()}`
    ];

    if (this.fullWidth()) {
      classes.push('pf-button--block');
    }

    if (this.disabled()) {
      classes.push('pf-button--disabled');
    }

    return classes.join(' ');
  });
}
