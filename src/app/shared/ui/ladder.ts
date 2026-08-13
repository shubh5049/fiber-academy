import { ChangeDetectionStrategy, Component, afterNextRender, computed, inject, signal } from '@angular/core';
import { Icon } from './icon';
import { ProgramService } from '../../core/services/program.service';

/** The signature 8-week "climb" ladder. Rungs + climber + summit trophy
 *  position reactively from ProgramService; CSS handles the transitions. */
@Component({
  selector: 'app-ladder',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <div class="card ladder-card">
      <div class="lc-head">
        <div><h3>My climb · 8-week path</h3><div class="since">Started Jul 7, 2026</div></div>
        <div class="pct">{{ prog.pct() }}<span>%</span></div>
      </div>
      <div class="ladder-wrap">
        <div class="ladder">
          <div class="rail l"></div><div class="rail r"></div>
          <div class="summit-cap" [class.reached]="allDone()">{{ allDone() ? 'CERTIFIED ✓' : 'CERTIFY' }}</div>
          <div class="summit" [class.reached]="allDone()" [class.collected]="allDone() && arrived()">
            <svg viewBox="0 0 52 52">
              <defs><linearGradient id="summitGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd34d"/><stop offset="1" stop-color="#e0a015"/></linearGradient></defs>
              <path class="sparkle" d="M9 6l.9 2 2 .9-2 .9L9 12l-.9-2.2-2-.9 2-.9z" fill="#ffe08a"/>
              <path class="sparkle" d="M44 14l.7 1.6 1.6.7-1.6.7L44 19l-.7-1.6-1.6-.7 1.6-.7z" fill="#ffe08a"/>
              <path class="trophy-body" d="M16 10h20v6a10 10 0 0 1-20 0z"/>
              <path d="M16 11c-5 0-6 8 1 9" fill="none" stroke="#caa23a" stroke-width="2.4" stroke-linecap="round" opacity="0.9"/>
              <path d="M36 11c5 0 6 8-1 9" fill="none" stroke="#caa23a" stroke-width="2.4" stroke-linecap="round" opacity="0.9"/>
              <rect class="trophy-stem" x="24" y="26" width="4" height="8" rx="1"/>
              <rect class="trophy-stem" x="18" y="34" width="16" height="4" rx="1.5"/>
              <rect class="trophy-stem" x="20" y="38" width="12" height="4" rx="1.5"/>
            </svg>
          </div>
          @for (m of prog.modules(); track m.id; let i = $index) {
            <div class="rung" [class.done]="prog.statusOf(i) === 'done'" [class.current]="prog.statusOf(i) === 'current'" [style.bottom.px]="rungBottom(i)"></div>
          }
          <div class="climber" [class.settling]="settling()" [class.sitting]="allDone() && arrived()" [class.has-trophy]="allDone() && arrived()" [style.bottom.px]="climberPos()">
            <svg viewBox="0 0 46 64">
              <g class="pose-stand">
                <line x1="17" y1="26" x2="11" y2="13" stroke="#002a3a" stroke-width="4" stroke-linecap="round"/><line x1="29" y1="26" x2="35" y2="13" stroke="#002a3a" stroke-width="4" stroke-linecap="round"/>
                <rect x="15" y="24" width="16" height="20" rx="6" fill="#00A8E0"/><rect x="14" y="40" width="18" height="5" rx="2" fill="#b5703a"/>
                <line x1="19" y1="44" x2="14" y2="55" stroke="#002a3a" stroke-width="4" stroke-linecap="round"/><line x1="27" y1="44" x2="32" y2="55" stroke="#002a3a" stroke-width="4" stroke-linecap="round"/>
              </g>
              <g class="pose-sit">
                <line x1="18" y1="28" x2="12" y2="16" stroke="#002a3a" stroke-width="4" stroke-linecap="round"/>
                <line x1="29" y1="28" x2="34" y2="34" stroke="#002a3a" stroke-width="4" stroke-linecap="round"/>
                <rect x="15" y="26" width="16" height="19" rx="6" fill="#00A8E0"/><rect x="14" y="41" width="18" height="5" rx="2" fill="#b5703a"/>
                <path d="M19 45 q-4 4 -8 3" fill="none" stroke="#002a3a" stroke-width="4" stroke-linecap="round"/>
                <path d="M27 45 q4 4 8 3" fill="none" stroke="#002a3a" stroke-width="4" stroke-linecap="round"/>
              </g>
              <circle cx="23" cy="16" r="7" fill="#ffe0c2"/><path d="M14 16a9 9 0 0 1 18 0z" fill="#ffb81c"/><rect x="13" y="15" width="20" height="3" rx="1.5" fill="#e0a015"/>
              <g class="held-trophy">
                <path d="M7 9h10v3a5 5 0 0 1-10 0z" fill="#ffd34d" stroke="#e0a015" stroke-width="0.6"/>
                <rect x="11" y="14" width="2" height="4" rx="0.6" fill="#caa23a"/><rect x="8.5" y="18" width="7" height="2" rx="0.8" fill="#caa23a"/>
              </g>
            </svg>
          </div>
        </div>
        <div class="weeks">
          @for (m of prog.modules(); track m.id; let i = $index) {
            <div class="week" [class.done]="prog.statusOf(i) === 'done'" [class.current]="prog.statusOf(i) === 'current'" [class.locked]="prog.statusOf(i) === 'locked'">
              <div class="wk-ico">
                @switch (prog.statusOf(i)) {
                  @case ('done') { <app-icon name="check" [size]="12" [strokeWidth]="3.5" /> }
                  @case ('current') { ▲ }
                  @default { <app-icon name="lock" [size]="12" /> }
                }
              </div>
              <div class="wk-name">Week {{ m.wk }} · {{ m.name }}<small>{{ weekSub(i) }}</small></div>
            </div>
          }
        </div>
      </div>
    </div>`,
})
export class Ladder {
  readonly prog = inject(ProgramService);

  private readonly N = computed(() => this.prog.modules().length);
  readonly allDone = computed(() => this.prog.modules().every(m => m.done));
  private readonly currentIdx = computed(() => {
    const i = this.prog.modules().findIndex((_, idx) => this.prog.statusOf(idx) === 'current');
    return i < 0 ? this.N() - 1 : i;
  });

  private readonly H = 360; private readonly padBot = 18;
  private get usable() { return this.H - 14 - this.padBot; }
  rungBottom(i: number): number { return this.padBot + this.usable * (i / (this.N() - 1)); }

  /** Where the climber should end up (current rung, or the summit when done). */
  readonly targetBottom = computed(() =>
    this.allDone() ? this.rungBottom(this.N() - 1) - 6 : this.rungBottom(this.currentIdx()) - 6);

  /** Animated climber position + celebration flags (drives the CSS transition). */
  readonly climberPos = signal(0);
  readonly settling = signal(false);
  readonly arrived = signal(false);

  constructor() {
    // start at the bottom rung, then climb up once the view is in the DOM
    this.climberPos.set(this.rungBottom(0) - 6);
    afterNextRender(() => {
      setTimeout(() => {
        this.settling.set(true);
        this.climberPos.set(this.targetBottom());
        setTimeout(() => this.arrived.set(true), 1200);
      }, 480);
    });
  }

  weekSub(i: number): string {
    const s = this.prog.statusOf(i);
    if (s === 'done') return 'Completed ' + (this.prog.modules()[i].date ?? '');
    if (s === 'current') return 'In progress';
    return 'Locked';
  }
}
