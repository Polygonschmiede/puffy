import { ChangeDetectionStrategy, Component, Input, OnInit, Optional, inject, input } from '@angular/core';
import { PfFormItem } from './pf-form-item.component';

@Component({
  selector: 'pf-form-control',
  template: `<ng-content />`,
  styleUrl: './pf-form-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-invalid]': 'invalid()',
    '[attr.aria-describedby]': 'describedBy'
  }
})
export class PfFormControl implements OnInit {
  readonly invalid = input(false);
  @Input() describedBy?: string;

  private readonly formItem = inject<PfFormItem | null>(PfFormItem, { optional: true });

  ngOnInit(): void {
    if (this.formItem && !this.describedBy) {
      const ids = [this.formItem.descriptionId, this.formItem.messageId].join(' ').trim();
      this.describedBy = ids || undefined;
    }
  }
}
