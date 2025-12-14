import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  computed,
  inject,
  input,
  output,
  signal
} from '@angular/core';

@Component({
  selector: 'pf-resizable',
  template: `
    <div
      class="pf-resizable__pane pf-resizable__pane--start"
      [style.flexBasis.%]="size()"
      [style.width.%]="isHorizontal() ? size() : undefined"
      [style.height.%]="isHorizontal() ? undefined : size()"
    >
      <ng-content select="[pfResizableStart]" />
    </div>
    <div
      class="pf-resizable__handle"
      role="separator"
      tabindex="0"
      [attr.aria-orientation]="direction()"
      [attr.aria-valuemin]="minSize()"
      [attr.aria-valuemax]="maxSize()"
      [attr.aria-valuenow]="size()"
      (pointerdown)="startDrag($event)"
      (keydown)="onKeydown($event)"
    ></div>
    <div class="pf-resizable__pane pf-resizable__pane--end">
      <ng-content select="[pfResizableEnd]" />
    </div>
  `,
  styleUrl: './pf-resizable.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClass()'
  }
})
export class PfResizable implements OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
  readonly minSize = input(15);
  readonly maxSize = input(85);
  readonly initialSize = input(50);

  readonly sizeChange = output<number>();

  private readonly sizeSignal = signal(this.initialSize());
  private dragStartPos = 0;
  private dragStartSize = 0;
  private dragging = false;

  protected readonly size = computed(() => this.sizeSignal());
  protected readonly isHorizontal = computed(() => this.direction() === 'horizontal');

  protected readonly hostClass = computed(() =>
    ['pf-resizable', `pf-resizable--${this.direction()}`].join(' ')
  );

  startDrag(event: PointerEvent): void {
    this.dragging = true;
    this.dragStartPos = this.isHorizontal() ? event.clientX : event.clientY;
    this.dragStartSize = this.size();
    (event.target as HTMLElement)?.setPointerCapture?.(event.pointerId);
    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);
  }

  private readonly onPointerMove = (event: PointerEvent): void => {
    if (!this.dragging) {
      return;
    }

    const rect = this.host.nativeElement.getBoundingClientRect();
    const total = this.isHorizontal() ? rect.width : rect.height;
    if (!total) {
      return;
    }

    const delta = (this.isHorizontal() ? event.clientX : event.clientY) - this.dragStartPos;
    const next = this.clamp(this.dragStartSize + (delta / total) * 100);
    this.sizeSignal.set(next);
    this.sizeChange.emit(next);
  };

  private readonly onPointerUp = (event: PointerEvent): void => {
    (event.target as HTMLElement)?.releasePointerCapture?.(event.pointerId);
    this.dragging = false;
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
  };

  onKeydown(event: KeyboardEvent): void {
    const step = 2;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      this.applyStep(step);
      event.preventDefault();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      this.applyStep(-step);
      event.preventDefault();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.sizeSignal.set(this.clamp(this.size()));
  }

  ngOnDestroy(): void {
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
  }

  private applyStep(delta: number): void {
    const next = this.clamp(this.size() + delta);
    this.sizeSignal.set(next);
    this.sizeChange.emit(next);
  }

  private clamp(value: number): number {
    const min = this.minSize();
    const max = this.maxSize();
    return Math.min(Math.max(value, min), max);
  }
}
