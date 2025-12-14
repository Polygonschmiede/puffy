import { ChangeDetectionStrategy, Component, HostListener, signal, input, output } from '@angular/core';

@Component({
  selector: 'pf-draggable-panel',
  template: `
    <div class="pf-draggable-panel__handle" (pointerdown)="startDrag($event)">
      <ng-content select="[pfPanelHandle]" />
    </div>
    <div class="pf-draggable-panel__content">
      <ng-content />
    </div>
  `,
  styleUrl: './pf-draggable-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pf-draggable-panel',
    '[class.pf-draggable-panel--dragging]': 'dragging()'
  }
})
export class PfDraggablePanel {
  readonly id = input<string>();
  readonly dragStart = output<string | undefined>();
  readonly dragEnd = output<string | undefined>();

  protected readonly dragging = signal(false);

  startDrag(event: PointerEvent): void {
    event.preventDefault();
    this.dragging.set(true);
    this.dragStart.emit(this.id());
  }

  @HostListener('window:pointerup')
  stopDrag(): void {
    if (this.dragging()) {
      this.dragging.set(false);
      this.dragEnd.emit(this.id());
    }
  }
}
