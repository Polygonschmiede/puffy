import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

let formItemId = 0;

@Component({
  selector: 'pf-form-item',
  template: `
    <div class="pf-form-item" [attr.data-invalid]="invalid() || null">
      <ng-content />
    </div>
  `,
  styleUrl: './pf-form-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': "'pf-form-item__host'"
  }
})
export class PfFormItem {
  readonly controlId = input<string | undefined>(undefined);
  readonly invalid = input(false);

  private readonly baseId = `pf-form-item-${formItemId++}`;

  protected readonly generatedId = computed(() => this.controlId() ?? this.baseId);

  get descriptionId(): string {
    return `${this.generatedId()}-description`;
  }

  get messageId(): string {
    return `${this.generatedId()}-message`;
  }
}
