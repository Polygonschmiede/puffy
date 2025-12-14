import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pf-dashboard-layout',
  template: `
    <div class="pf-dashboard-layout">
      <aside class="pf-dashboard-layout__aside">
        <ng-content select="[pfDashboardAside]" />
      </aside>
      <main class="pf-dashboard-layout__main">
        <ng-content />
      </main>
      <aside class="pf-dashboard-layout__secondary">
        <ng-content select="[pfDashboardSecondary]" />
      </aside>
    </div>
  `,
  styleUrl: './pf-dashboard-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-dashboard-layout__host'
  }
})
export class PfDashboardLayout {}
