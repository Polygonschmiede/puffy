import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-pf',
  imports: [],
  template: `
    <p>
      pf works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pf {

}
