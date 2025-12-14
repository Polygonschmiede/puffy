import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'pf-form-label',
  template: `
    <label [attr.for]="forId()" [class]="labelClass()">
      <ng-content />
      @if (label()) {
        <span>{{ label() }}</span>
      }
      @if (required()) {
        <span aria-hidden="true" class="pf-form-label__asterisk">*</span>
      }
    </label>
  `,
  styleUrl: './pf-form-label.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': "'pf-form-label__host'"
  }
})
export class PfFormLabel {
  readonly label = input<string | undefined>();
  readonly forId = input<string | undefined>();
  readonly required = input(false);
  readonly tone = input<'default' | 'muted'>('default');

  protected readonly labelClass = computed(() =>
    [
      'pf-form-label',
      this.tone() === 'muted' ? 'pf-form-label--muted' : '',
      this.required() ? 'pf-form-label--required' : ''
    ]
      .filter(Boolean)
      .join(' ')
  );
}
