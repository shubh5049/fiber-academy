import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Icon } from './icon';
import { Module, ModuleStatus } from '../../core/models';

/** Self-paced module tile: video thumbnail + body + launch button.
 *  Emits `launch(id)`; the container decides what launching means. */
@Component({
  selector: 'app-module-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <div class="mod" [class.locked]="status() === 'locked'" [class.done]="status() === 'done'">
      <div class="mod-thumb">
        <div class="thumb-ico"><app-icon [name]="module().icon" [size]="42" [strokeWidth]="1.6" /></div>
        <img [src]="module().thumb" alt="" loading="lazy" (error)="onImgError($event)" />
        @if (status() === 'locked') {
          <div class="lockbig"><app-icon name="lock" [size]="34" /></div>
        } @else {
          <div class="play"><app-icon name="play" [size]="26" /></div>
        }
        <div class="mod-badge">WEEK {{ module().wk }}</div>
        <div class="mod-chk"><app-icon name="check" [size]="15" [strokeWidth]="3" /></div>
      </div>
      <div class="mod-body">
        <div class="mod-wk">{{ wkLabel() }}</div>
        <div class="mod-title">{{ module().name }}</div>
        <div class="mod-desc">{{ module().desc }}</div>
        <div class="mod-foot">
          @switch (status()) {
            @case ('locked') {
              <button class="mod-btn locked" disabled><app-icon name="lock" [size]="15" />Locked</button>
            }
            @case ('done') {
              <button class="mod-btn done" (click)="launch.emit(module().id)"><app-icon name="check" [size]="15" [strokeWidth]="2.5" />Completed · Rewatch</button>
            }
            @default {
              <button class="mod-btn" (click)="launch.emit(module().id)"><app-icon name="play" [size]="15" />Launch &amp; complete</button>
            }
          }
          @if (meta()) { <span class="mod-meta">{{ meta() }}</span> }
        </div>
      </div>
    </div>`,
})
export class ModuleCard {
  readonly module = input.required<Module>();
  readonly status = input.required<ModuleStatus>();
  readonly meta = input<string>();
  readonly launch = output<number>();

  readonly wkLabel = computed(() => {
    const s = this.status();
    if (s === 'done') return 'Completed ' + (this.module().date ?? '');
    if (s === 'current') return 'Available now';
    return 'Locked';
  });

  onImgError(e: Event): void {
    (e.target as HTMLImageElement).style.display = 'none';
  }
}
