import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { PfTab } from './pf-tabs.types';

@Component({
  selector: 'pf-tabs',
  imports: [],
  template: `
    <div class="pf-tabs" role="tablist">
      @for (tab of tabs(); track tab.id) {
        <button
          type="button"
          class="pf-tabs__tab"
          [class.pf-tabs__tab--active]="activeId() === tab.id"
          [attr.role]="'tab'"
          [attr.aria-selected]="activeId() === tab.id"
          [attr.aria-controls]="'panel-' + tab.id"
          [disabled]="tab.disabled"
          (click)="select(tab.id, tab.disabled)"
        >
          {{ tab.label }}
        </button>
      }
    </div>
    @for (tab of tabs(); track tab.id) {
      @if (activeId() === tab.id) {
        <div
          class="pf-tabs__panel"
          [attr.role]="'tabpanel'"
          [attr.id]="'panel-' + tab.id"
          [attr.aria-label]="tab.label"
        >
          {{ tab.content }}
        </div>
      }
    }
  `,
  styleUrl: './pf-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PfTabs {
  readonly tabs = input<PfTab[]>([]);
  readonly defaultActiveId = input<string | null>(null);

  private readonly active = signal<string | null>(null);
  protected readonly activeId = computed(() => this.active() ?? this.defaultActiveId() ?? this.tabs()[0]?.id ?? null);

  select(id: string, disabled?: boolean): void {
    if (disabled) {
      return;
    }
    this.active.set(id);
  }
}
