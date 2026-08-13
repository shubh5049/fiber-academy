import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Icon } from './icon';
import { Module, ModuleStatus } from '../../core/models';

const ACCENTS: Record<number, string> = { 1: '#00A8E0', 2: '#0568ae', 3: '#2ca01c', 4: '#0568ae', 5: '#00A8E0', 6: '#5d7783', 7: '#5d7783', 8: '#5d7783' };
const LABEL: Record<ModuleStatus, string> = { done: 'Completed', current: 'In progress', locked: 'Locked' };

/** Module-log "work order" ticket card. */
@Component({
  selector: 'app-ticket',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <div class="ticket" [class.done]="status() === 'done'" [class.current]="status() === 'current'"
         [class.locked]="status() === 'locked'" [style.--accent]="accent()">
      <div class="tk-row">
        <span class="tk-job">WO-{{ 1000 + module().id }}</span>
        <span class="tk-status"><span class="d"></span>{{ statusLabel() }}</span>
      </div>
      <div class="tk-ico"><app-icon [name]="module().icon" [size]="19" /></div>
      <div class="tk-name">{{ module().name }}</div>
      <div class="tk-desc">{{ module().desc }}</div>
      <div class="tk-date">{{ dateLabel() }}</div>
    </div>`,
})
export class Ticket {
  readonly module = input.required<Module>();
  readonly status = input.required<ModuleStatus>();

  readonly accent = computed(() => this.status() === 'locked' ? '#5d7783' : (ACCENTS[this.module().id] ?? '#00A8E0'));
  readonly statusLabel = computed(() => LABEL[this.status()]);
  readonly dateLabel = computed(() => {
    const s = this.status();
    if (s === 'done') return 'DONE ' + (this.module().date ?? '').toUpperCase();
    if (s === 'current') return 'IN PROGRESS';
    return 'OPENS WK ' + this.module().wk;
  });
}
