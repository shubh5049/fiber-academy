import { Injectable, signal } from '@angular/core';

export interface ToastMsg { id: number; msg: string; sub?: string; }

/** Transient toast notifications. A single <app-toast> in the shell renders
 *  the current message; auto-dismisses after a few seconds. */
@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly current = signal<ToastMsg | null>(null);
  private timer: ReturnType<typeof setTimeout> | undefined;

  show(msg: string, sub?: string): void {
    this.current.set({ id: Date.now(), msg, sub });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.current.set(null), 3400);
  }
}
