import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { RoleTag } from './role-tag';
import { Icon } from './icon';
import { ProgramService } from '../../core/services/program.service';
import { ToastService } from '../../core/services/toast.service';
import { REPORTS } from '../../core/mock-data';

/** Reusable Reports page (instructor / manager / operations / superuser).
 *  Filters panel + report catalog + a live cohort-snapshot modal. */
@Component({
  selector: 'app-reports-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RoleTag, Icon],
  template: `
    <app-role-tag [text]="who() + ' · Reports'" />
    <h1 class="page-h">Reports</h1>
    <p class="page-sub">Generate and export program reports. Filter by cohort, date range, and status, then export to share.</p>
    <div class="panel"><h4><app-icon name="filter" [size]="18" />Filters</h4>
      <div class="fld-row" style="margin-top:6px">
        <div class="fld" style="margin:0"><label>Cohort</label><select><option>All cohorts</option><option>July-07</option><option>June-23</option><option>May-12</option></select></div>
        <div class="fld" style="margin:0"><label>Date range</label><select><option>This week</option><option>This month</option><option>Program to date</option></select></div>
      </div>
    </div>
    <div class="section-h"><h3>Available reports</h3><div class="ln"></div></div>
    <div class="cohort-grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">
      @for (r of reports; track r.name) {
        <div class="panel" style="margin:0">
          <h4 style="margin-bottom:4px"><app-icon [name]="r.ic" [size]="18" />{{ r.name }}</h4>
          <p style="min-height:38px">{{ r.desc }}</p>
          <div style="display:flex;gap:8px;margin-top:10px">
            <button class="btn ghost sm" (click)="open.set(r.name)">View</button>
            <button class="btn outline sm" (click)="toast.show('Export ready', r.name + ' downloaded as .csv')"><app-icon name="download" [size]="16" /> Export</button>
          </div>
        </div>
      }
    </div>

    @if (open(); as name) {
      <div class="modal-bg show" (click)="backdrop($event)">
        <div class="modal wide">
          <div class="modal-head">
            <div class="mh-ic"><app-icon name="chart" [size]="22" /></div>
            <div style="min-width:0"><h3>{{ name }}</h3><p>Program to date</p></div>
            <button class="x" (click)="open.set(null)"><app-icon name="x" [size]="18" /></button>
          </div>
          <div class="modal-body">
            <p style="font-size:13px;color:var(--text-soft);margin-bottom:16px">Live snapshot across cohorts. Full report includes per-trainee detail and can be exported.</p>
            @for (c of prog.cohorts(); track c.name) {
              <div style="margin-bottom:16px">
                <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;color:var(--att-navy);margin-bottom:6px"><span>Cohort {{ c.name }}</span><span class="mono" style="color:var(--text-soft)">{{ c.avgPr }}%</span></div>
                <div class="mini-bar" style="height:10px"><i [style.width.%]="c.avgPr"></i></div>
                <div style="font-size:11px;color:var(--text-soft);margin-top:4px">{{ c.size }} trainees · {{ c.status }}</div>
              </div>
            }
          </div>
          <div class="modal-foot">
            <button class="btn ghost" (click)="open.set(null)">Close</button>
            <button class="btn" (click)="toast.show('Export ready', name + ' downloaded')"><app-icon name="download" [size]="16" />Export .csv</button>
          </div>
        </div>
      </div>
    }`,
})
export class ReportsView {
  readonly who = input('');
  readonly reports = REPORTS;
  readonly prog = inject(ProgramService);
  readonly toast = inject(ToastService);
  readonly open = signal<string | null>(null);

  backdrop(e: MouseEvent): void { if ((e.target as HTMLElement).classList.contains('modal-bg')) this.open.set(null); }
}
