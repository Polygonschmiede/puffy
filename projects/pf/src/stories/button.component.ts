import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'storybook-button',
  standalone: true,
  imports: [NgClass],
  template: ` <button
  type="button"
  (click)="onClick.emit($event)"
  [ngClass]="classes"
  [style.background-color]="backgroundColor()"
>
  {{ label() }}
</button>`,
  styleUrls: ['./button.css'],
})
export class ButtonComponent {
  /** Is this the principal call to action on the page? */
  readonly primary = input(false);

  /** What background color to use */
  readonly backgroundColor = input<string>();

  /** How large should the button be? */
  readonly size = input<'small' | 'medium' | 'large'>('medium');

  /**
   * Button contents
   *
   * @required
   */
  readonly label = input('Button');

  /** Optional click handler */
  readonly onClick = output<Event>();

  public get classes(): string[] {
    const mode = this.primary() ? 'storybook-button--primary' : 'storybook-button--secondary';

    return ['storybook-button', `storybook-button--${this.size()}`, mode];
  }
}
