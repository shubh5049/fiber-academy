import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Icon } from './icon';
import { Avatar } from './avatar';
import { Pill } from './pill';
import { OverlayService } from '../../core/services/overlay.service';
import { ProgramService } from '../../core/services/program.service';
import { PersonaService } from '../../core/services/persona.service';
import { ProfileService } from '../../core/services/profile.service';
import { ToastService } from '../../core/services/toast.service';
import { statusPill } from '../../core/util';
import { Trainee } from '../../core/models';

/** Shell-mounted trainee detail modal (opened by staff tables). Mentors see a
 *  scorecard-hidden view per the access rules. */
@Component({
  selector: 'app-trainee-detail-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Avatar, Pill],
  template: `
    @if (t(); as tr) {
      <div class="modal-bg show" (click)="backdrop($event)">
        <div class="modal wide">
          <div class="modal-head">
            <div class="mh-ic"><app-icon name="user" [size]="22" /></div>
            <div style="min-width:0"><h3>Trainee detail</h3><p>{{ tr.name }} · {{ tr.cohort }}</p></div>
            <button class="x" (click)="overlay.closeTrainee()"><app-icon name="x" [size]="18" /></button>
          </div>
          <div class="modal-body">
            <div style="display:flex;align-items:center;gap:14px;margin-bottom:18px">
              <app-avatar [name]="tr.name" [size]="52" />
              <div style="min-width:0">
                <div style="font-size:18px;font-weight:900;color:var(--att-navy)">{{ tr.name }}</div>
                <div style="font-size:12.5px;color:var(--text-soft)">{{ tr.cohort }} · Week {{ tr.wk }} · Mentor {{ tr.mentor }} · <button class="linkbtn" (click)="viewProfile(tr.name)">View full profile</button></div>
              </div>
              <div style="margin-left:auto"><app-pill [variant]="sp(tr).variant" [text]="sp(tr).text" /></div>
            </div>
            @if (tr.risk) {
              <div style="background:rgba(214,69,69,.08);border:1px solid rgba(214,69,69,.25);border-radius:12px;padding:12px 14px;margin-bottom:16px;font-size:12.5px;color:#b53232;font-weight:600"><b>At risk:</b> {{ tr.risk }}</div>
            }
            @if (isMentor()) {
              <div class="stats s3" style="margin-top:0;margin-bottom:6px">
                <div class="stat" style="padding:12px 14px"><div><div class="sl">Progress</div><div class="sv" style="font-size:22px">{{ tr.pr }}<span>%</span></div></div></div>
                <div class="stat" style="padding:12px 14px"><div><div class="sl">Program week</div><div class="sv" style="font-size:22px">{{ tr.wk }}<span> / 8</span></div></div></div>
                <div class="stat" style="padding:12px 14px;opacity:.75"><div class="si" style="background:#eef2f5;color:var(--text-soft)"><app-icon name="lock" [size]="24" /></div><div><div class="sl">Scorecard</div><div class="sv" style="font-size:13px;color:var(--text-soft)">Hidden for mentors</div></div></div>
              </div>
            } @else {
              <div class="stats s3" style="margin-top:0;margin-bottom:6px">
                <div class="stat" style="padding:12px 14px"><div><div class="sl">Progress</div><div class="sv" style="font-size:22px">{{ tr.pr }}<span>%</span></div></div></div>
                <div class="stat" style="padding:12px 14px"><div><div class="sl">Attendance</div><div class="sv" style="font-size:22px">{{ tr.att }}<span>%</span></div></div></div>
                <div class="stat" style="padding:12px 14px"><div><div class="sl">Avg Score</div><div class="sv" style="font-size:22px">{{ tr.score }}<span>%</span></div></div></div>
              </div>
            }
            <div class="section-h" style="margin:18px 0 10px"><h3 style="font-size:15px">Course breakdown</h3><div class="ln"></div></div>
            <table class="grid"><thead><tr><th>Week</th><th>Module</th><th>Status</th></tr></thead><tbody>
              @for (m of prog.modules(); track m.id; let i = $index) {
                <tr><td class="mono">{{ m.wk }}</td><td>{{ m.name }}</td><td>
                  @if (i < tr.wk - 1) { <span class="pill green">Complete</span> }
                  @else if (i === tr.wk - 1) { <span class="pill blue">In progress</span> }
                  @else { <span class="pill grey">Locked</span> }
                </td></tr>
              }
            </tbody></table>
            <div class="section-h" style="margin:18px 0 10px"><h3 style="font-size:15px">Ride-along history</h3><div class="ln"></div></div>
            @if (rides().length) {
              @for (r of rides(); track r.id) {
                <div class="list-row">
                  <div class="lr-ic"><app-icon name="car" [size]="21" /></div>
                  <div class="lr-main"><div class="lr-t">{{ r.task }}</div><div class="lr-s">{{ r.date }} · {{ r.loc }}@if (r.notes) { · {{ r.notes }}}</div></div>
                  @if (r.status === 'completed') { <span class="pill green">Scored {{ r.score }}/5</span> } @else { <span class="pill amber">{{ r.status }}</span> }
                </div>
              }
            } @else { <p style="font-size:13px;color:var(--text-soft)">No ride-alongs logged yet.</p> }
          </div>
          <div class="modal-foot">
            <button class="btn ghost" (click)="overlay.closeTrainee()">Close</button>
            @if (isInstructor()) { <button class="btn" (click)="logFollowUp(tr.name)">Log follow-up</button> }
          </div>
        </div>
      </div>
    }`,
})
export class TraineeDetailModal {
  readonly overlay = inject(OverlayService);
  readonly prog = inject(ProgramService);
  private persona = inject(PersonaService);
  private profiles = inject(ProfileService);
  private toast = inject(ToastService);

  readonly t = computed<Trainee | undefined>(() => this.prog.trainees().find(x => x.id === this.overlay.traineeId()));
  readonly rides = computed(() => { const tr = this.t(); return tr ? this.prog.rideAlongs().filter(r => r.trainee === tr.name) : []; });
  readonly isMentor = computed(() => this.persona.current() === 'mentor');
  readonly isInstructor = computed(() => this.persona.current() === 'instructor');

  sp = statusPill;
  viewProfile(name: string): void { this.overlay.closeTrainee(); this.profiles.open(name); }
  logFollowUp(name: string): void { this.overlay.closeTrainee(); this.toast.show('Follow-up logged', 'Note saved to ' + name + "'s record"); }
  backdrop(e: MouseEvent): void { if ((e.target as HTMLElement).classList.contains('modal-bg')) this.overlay.closeTrainee(); }
}
