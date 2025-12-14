import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { PfAccordionItem } from './pf-accordion.types';

@Component({
  selector: 'pf-accordion',
  imports: [],
  template: `
    <div class="pf-accordion" role="presentation">
      @for (item of items(); track item.id) {
        <section class="pf-accordion__item">
          <button
            type="button"
            class="pf-accordion__trigger"
            [attr.aria-expanded]="isOpen()"
            [attr.aria-controls]="'panel-' + item.id"
            [disabled]="item.disabled"
            (click)="toggle(item.id, item.disabled)"
          >
            <span>{{ item.title }}</span>
            <span class="pf-accordion__chevron" [class.open]="isOpen()">⌄</span>
          </button>
          @if (isOpen()) {
            <div class="pf-accordion__panel" [id]="'panel-' + item.id">
              {{ item.content }}
            </div>
          }
        </section>
      }
    </div>
  `,
  styleUrl: './pf-accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PfAccordion {
  readonly items = input<PfAccordionItem[]>([]);
  readonly collapsible = input(true);

  private readonly openId = signal<string | null>(null);

  protected readonly isOpen = computed(() => {
    const current = this.openId();
    return (id: string) => current === id;
  });

  toggle(id: string, disabled?: boolean): void {
    if (disabled) {
      return;
    }

    if (this.openId() === id) {
      if (this.collapsible()) {
        this.openId.set(null);
      }
      return;
    }

    this.openId.set(id);
  }
}
