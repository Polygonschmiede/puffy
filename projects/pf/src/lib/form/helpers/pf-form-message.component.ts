import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'pf-form-message',
  template: `<p class="pf-form-message" [id]="id()" role="alert"><ng-content /></p>`,
  styleUrl: './pf-form-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PfFormMessage {
  readonly id = input.required<string>();
}
