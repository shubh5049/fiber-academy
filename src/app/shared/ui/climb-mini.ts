import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgramService } from '../../core/services/program.service';

/** Compact "Your climb" summary for the dashboard (links to My Climb). */
@Component({
  selector: 'app-climb-mini',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="card climb-mini">
      <div class="cm-head">
        <div><h3>Your climb</h3><div class="since">8-week path · Week {{ prog.currentWeek() }} of 8</div></div>
        <div class="cm-pct">{{ prog.pct() }}<span>%</span></div>
      </div>
      <div class="climb-track">
        @for (m of prog.modules(); track m.id; let i = $index) {
          <span class="ct-seg"
            [class.done]="prog.statusOf(i) === 'done'"
            [class.current]="prog.statusOf(i) === 'current'"
            [class.locked]="prog.statusOf(i) === 'locked'"
            [title]="'Week ' + m.wk + ' · ' + m.name"></span>
        }
      </div>
      <div class="cm-now">
        <span class="cm-dot"></span>
        <div><div class="cm-k">Now</div><div class="cm-t">{{ now() }}</div></div>
      </div>
      <button class="btn ghost" style="width:100%;margin-top:16px" routerLink="/trainee/my-climb">View my climb →</button>
    </div>`,
})
export class ClimbMini {
  readonly prog = inject(ProgramService);
  readonly now = computed(() => {
    const m = this.prog.currentModule();
    return m ? `Week ${m.wk} · ${m.name}` : 'All modules complete 🎉';
  });
}
