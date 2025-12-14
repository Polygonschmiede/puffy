import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';

let collapsibleId = 0;

@Component({
  selector: 'pf-collapsible',
  template: `
    <button
      type="button"
      class="pf-collapsible__trigger"
      [attr.aria-expanded]="isOpen()"
      [attr.aria-controls]="contentId"
      [attr.aria-disabled]="disabled()"
      [disabled]="disabled()"
      (click)="toggle()"
    >
      <ng-content select="[pfCollapsibleTrigger]" />
    </button>
    <div
      class="pf-collapsible__content"
      [attr.id]="contentId"
      [hidden]="!isOpen()"
      role="region"
    >
      <ng-content select="[pfCollapsibleContent]" />
    </div>
  `,
  styleUrl: './pf-collapsible.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClass()'
  }
})
export class PfCollapsible {
  readonly open = input<boolean | undefined>(undefined);
  readonly disabled = input(false);

  readonly openChange = output<boolean>();

  protected readonly contentId = `pf-collapsible-content-${collapsibleId++}`;

  private readonly internalOpen = signal(false);
  private readonly controlled = computed(() => this.open() !== undefined);

  protected readonly isOpen = computed(() =>
    this.controlled() ? Boolean(this.open()) : this.internalOpen()
  );

  protected readonly hostClass = computed(() =>
    ['pf-collapsible', this.isOpen() ? 'pf-collapsible--open' : '']
      .filter(Boolean)
      .join(' ')
  );

  toggle(): void {
    if (this.disabled()) {
      return;
    }

    const next = !this.isOpen();
    if (!this.controlled()) {
      this.internalOpen.set(next);
    }

    this.openChange.emit(next);
  }
}
