import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PfButton } from 'pf';

@Component({
  selector: 'app-root',
  imports: [PfButton],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
}
