import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type PfIconButtonVariant = 'raised' | 'flat' | 'ghost';

@Component({
  selector: 'pf-icon-button',
  imports: [],
  template: `
    <button [attr.type]="type()" [disabled]="disabled()" [class]="buttonClass()">
      <ng-content />
    </button>
  `,
  styleUrl: './pf-icon-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-icon-button'
  }
})
export class PfIconButton {
  readonly variant = input<PfIconButtonVariant>('raised');
  readonly disabled = input(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  protected readonly buttonClass = computed(() => {
    const classes = ['pf-icon-button__control', `pf-icon-button--${this.variant()}`];
    if (this.disabled()) {
      classes.push('pf-icon-button--disabled');
    }
    return classes.join(' ');
  });
}
