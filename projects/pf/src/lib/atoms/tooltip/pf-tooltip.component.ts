import { ChangeDetectionStrategy, Component, HostListener, computed, input, signal } from '@angular/core';

export type PfTooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'pf-tooltip',
  imports: [],
  template: `
    <span class="pf-tooltip__trigger">
      <ng-content select="[pfTooltipTrigger]" />
    </span>
    @if (visible()) {
      <span class="pf-tooltip__bubble" [class]="bubbleClass()">{{ content() }}</span>
    }
  `,
  styleUrl: './pf-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-tooltip',
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
    '(focusin)': 'show()',
    '(focusout)': 'hide()'
  }
})
export class PfTooltip {
  readonly content = input.required<string>();
  readonly position = input<PfTooltipPosition>('top');

  private readonly isVisible = signal(false);
  protected readonly visible = computed(() => this.isVisible());
  protected readonly bubbleClass = computed(() => `pf-tooltip__bubble--${this.position()}`);

  show(): void {
    this.isVisible.set(true);
  }

  hide(): void {
    this.isVisible.set(false);
  }
}
