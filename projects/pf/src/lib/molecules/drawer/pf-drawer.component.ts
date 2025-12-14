import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'pf-drawer',
  imports: [],
  template: `
    @if (open()) {
      <div class="pf-drawer__backdrop" (click)="backdropClose()"></div>
      <aside class="pf-drawer__panel" role="dialog" aria-modal="true">
        <header class="pf-drawer__header">
          <h3 class="pf-drawer__title">{{ title() }}</h3>
          <button type="button" class="pf-drawer__close" (click)="close()">×</button>
        </header>
        <div class="pf-drawer__body">
          <ng-content></ng-content>
        </div>
      </aside>
    }
  `,
  styleUrl: './pf-drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-drawer'
  }
})
export class PfDrawer {
  readonly open = input(false);
  readonly title = input('Drawer');
  readonly closeOnBackdrop = input(true);

  readonly openChange = output<boolean>();

  close(): void {
    this.openChange.emit(false);
  }

  backdropClose(): void {
    if (this.closeOnBackdrop()) {
      this.close();
    }
  }
}
