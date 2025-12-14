import { Injectable, computed, signal } from '@angular/core';

type ToastOptions = {
  title: string;
  description?: string;
  tone?: 'default' | 'success' | 'danger';
  duration?: number;
};

type Toast = ToastOptions & { id: number };

@Injectable({ providedIn: 'root' })
export class PfToastService {
  private readonly toastsSignal = signal<Toast[]>([]);
  private idCounter = 0;

  readonly toasts = computed(() => this.toastsSignal());

  show(options: ToastOptions): number {
    const toast: Toast = {
      ...options,
      id: ++this.idCounter,
      tone: options.tone ?? 'default'
    };

    this.toastsSignal.update((list) => [...list, toast]);

    const duration = options.duration ?? 4000;
    if (duration > 0) {
      setTimeout(() => this.dismiss(toast.id), duration);
    }

    return toast.id;
  }

  dismiss(id: number): void {
    this.toastsSignal.update((list) => list.filter((toast) => toast.id !== id));
  }

  clear(): void {
    this.toastsSignal.set([]);
  }
}
