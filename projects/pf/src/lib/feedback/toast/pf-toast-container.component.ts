import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { PfToastService } from './pf-toast.service';

@Component({
  selector: 'pf-toast-container',
  template: `
    <section class="pf-toast-container" role="region" aria-live="polite">
      @for (toast of toasts(); track toast.id) {
        <article class="pf-toast" [class]="'pf-toast pf-toast--' + toast.tone">
          <div>
            <p class="pf-toast__title">{{ toast.title }}</p>
            @if (toast.description) {
              <p class="pf-toast__description">{{ toast.description }}</p>
            }
          </div>
          <button type="button" class="pf-toast__close" (click)="dismiss(toast.id)" aria-label="Schließen">
            ×
          </button>
        </article>
      }
    </section>
  `,
  styleUrl: './pf-toast-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-toast-container__host'
  }
})
export class PfToastContainer {
  private readonly toastService = inject(PfToastService);

  protected readonly toasts = computed(() => this.toastService.toasts());

  dismiss(id: number): void {
    this.toastService.dismiss(id);
  }
}
