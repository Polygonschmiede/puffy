import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pf-table',
  imports: [],
  template: `
    <div class="pf-table__wrapper">
      <table class="pf-table__table">
        <ng-content select="caption"></ng-content>
        <ng-content select="thead"></ng-content>
        <ng-content select="tbody"></ng-content>
        <ng-content select="tfoot"></ng-content>
      </table>
    </div>
  `,
  styleUrl: './pf-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-table'
  }
})
export class PfTable {}
