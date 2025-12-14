import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'pf-form-description',
  template: `<p class="pf-form-description" [id]="id()"><ng-content /></p>`,
  styleUrl: './pf-form-description.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PfFormDescription {
  readonly id = input.required<string>();
}
