import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'pf-icon',
  template: `
    <span
      class="pf-icon__glyph"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-hidden]="ariaLabel() ? null : true"
      [innerHTML]="svg()"
    ></span>
  `,
  styleUrl: './pf-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': "'pf-icon'"
  }
})
export class PfIcon {
  readonly name = input<string | undefined>();
  readonly svg = input<string | undefined>();
  readonly ariaLabel = input<string | undefined>();

  protected readonly glyphClass = computed(() =>
    ['pf-icon__glyph', this.name() ? `pf-icon--${this.name()}` : ''].filter(Boolean).join(' ')
  );
}
