import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Labeled horizontal progress bar (KPI breakdown rows in dashboards/reports). */
@Component({
  selector: 'app-breakdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;color:var(--att-navy);margin-bottom:6px">
        <span>{{ label() }}</span><span class="mono" style="color:var(--text-soft)">{{ value() }}%</span>
      </div>
      <div class="mini-bar" style="height:8px"><i [style.width.%]="value()" [style.background]="color()"></i></div>
    </div>`,
})
export class Breakdown {
  readonly label = input('');
  readonly value = input(0);
  readonly color = input('#00A8E0');
}
