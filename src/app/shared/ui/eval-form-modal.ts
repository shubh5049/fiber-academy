import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { Icon } from './icon';
import { OverlayService } from '../../core/services/overlay.service';
import { ProgramService } from '../../core/services/program.service';
import { ToastService } from '../../core/services/toast.service';
import { RideAlong } from '../../core/models';

const CRITERIA = ['Safety & PPE compliance', 'Equipment handling', 'Installation technique', 'Troubleshooting', 'Customer interaction'];

/** Shell-mounted ride-along evaluation form (mentor). Rating fields + comments,
 *  save-draft / submit. Submitting writes the score to the trainee's record. */
@Component({
  selector: 'app-eval-form-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    @if (r(); as ride) {
      <div class="modal-bg show" (click)="backdrop($event)">
        <div class="modal wide">
          <div class="modal-head">
            <div class="mh-ic"><app-icon name="clipboard" [size]="22" /></div>
            <div style="min-width:0"><h3>{{ done() ? 'Ride-along evaluation' : 'Complete evaluation' }}</h3><p>{{ ride.trainee }}</p></div>
            <button class="x" (click)="overlay.closeEval()"><app-icon name="x" [size]="18" /></button>
          </div>
          <div class="modal-body">
            <div style="background:var(--paper);border-radius:12px;padding:14px 16px;margin-bottom:18px;font-size:13px">
              <div style="font-weight:800;color:var(--att-navy);margin-bottom:4px">{{ ride.trainee }} · {{ ride.task }}</div>
              <div style="color:var(--text-soft)">{{ ride.date }} · {{ ride.loc }}</div>
            </div>
            @for (c of criteria; track $index; let ci = $index) {
              <div class="fld"><label>{{ c }}</label>
                <div class="rating">
                  @for (n of [1,2,3,4,5]; track n) {
                    <button type="button" [class.sel]="selected(ci) === n" (click)="rate(ci, n)" [disabled]="done()">{{ n }}</button>
                  }
                </div>
              </div>
            }
            <div class="fld"><label>Comments & coaching notes</label><textarea placeholder="What went well, what to work on next time..." [value]="notes()" (input)="notes.set($any($event.target).value)" [disabled]="done()"></textarea></div>
          </div>
          <div class="modal-foot">
            @if (done()) {
              <button class="btn ghost" (click)="overlay.closeEval()">Close</button>
            } @else {
              <button class="btn outline" (click)="saveDraft()">Save draft</button>
              <button class="btn green" (click)="submit(ride)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12l5 5 9-11"/></svg>Submit evaluation</button>
            }
          </div>
        </div>
      </div>
    }`,
})
export class EvalFormModal {
  readonly overlay = inject(OverlayService);
  private prog = inject(ProgramService);
  private toast = inject(ToastService);

  readonly criteria = CRITERIA;
  readonly r = computed<RideAlong | undefined>(() => this.prog.rideAlongs().find(x => x.id === this.overlay.evalId()));
  readonly done = computed(() => this.r()?.status === 'completed');
  private ratings = signal<Record<number, number>>({});
  readonly notes = signal('');

  constructor() {
    // reset the form each time a different ride opens; prefill for completed ones
    effect(() => {
      const ride = this.r();
      if (ride) {
        this.notes.set(ride.status === 'completed' ? (ride.notes ?? '') : '');
        this.ratings.set(ride.status === 'completed' && ride.score
          ? { 0: ride.score, 1: ride.score, 2: ride.score, 3: ride.score, 4: ride.score } : {});
      }
    });
  }

  selected(ci: number): number { return this.ratings()[ci] ?? 0; }
  rate(ci: number, n: number): void { this.ratings.update(m => ({ ...m, [ci]: n })); }
  saveDraft(): void { this.overlay.closeEval(); this.toast.show('Draft saved', 'You can finish this evaluation later'); }

  submit(ride: RideAlong): void {
    const vals = Object.values(this.ratings());
    const score = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 4;
    this.prog.submitEval(ride.id, score, this.notes());
    this.overlay.closeEval();
  }

  backdrop(e: MouseEvent): void { if ((e.target as HTMLElement).classList.contains('modal-bg')) this.overlay.closeEval(); }
}
