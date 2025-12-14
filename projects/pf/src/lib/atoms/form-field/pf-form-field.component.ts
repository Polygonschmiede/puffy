import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { PfFormLabel } from './pf-form-label.component';

@Component({
  selector: 'pf-form-field',
  imports: [PfFormLabel],
  template: `
    @if (label()) {
      <pf-form-label
        [label]="label()"
        [forId]="controlId()"
        [required]="required()"
        [tone]="labelTone()"
      />
    } @else {
      <ng-content select="pf-form-label" />
    }

    <div class="pf-form-field__control">
      <ng-content select="[pfFormControl]" />
    </div>

    @if (description()) {
      <p class="pf-form-field__description" [id]="descriptionId()">{{ description() }}</p>
    }

    @if (error()) {
      <p class="pf-form-field__error" [id]="errorId()" role="alert">{{ error() }}</p>
    }
  `,
  styleUrl: './pf-form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': "'pf-form-field'",
    '[attr.data-invalid]': 'error() ? true : null'
  }
})
export class PfFormField {
  readonly label = input<string | undefined>();
  readonly labelTone = input<'default' | 'muted'>('default');
  readonly controlId = input<string | undefined>();
  readonly description = input<string | undefined>();
  readonly error = input<string | undefined>();
  readonly required = input(false);

  protected readonly descriptionId = computed(() =>
    this.description() ? `${this.controlId() ?? 'pf-control'}-description` : undefined
  );

  protected readonly errorId = computed(() =>
    this.error() ? `${this.controlId() ?? 'pf-control'}-error` : undefined
  );
}
