import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Icon } from './icon';
import { KpiCard } from '../../core/models';

/** Spectrum-style KPI hero tile: gradient card + frosted icon + big number +
 *  trend pill + inline sparkline. */
@Component({
  selector: 'app-kpi-tile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <div [class]="'kpi ' + card().cls">
      <div class="kpi-top">
        <span class="kpi-lbl">{{ card().lbl }}</span>
        <span class="kpi-ic"><app-icon [name]="card().ic" [size]="19" [strokeWidth]="2.2" /></span>
      </div>
      <div class="kpi-num">{{ card().num }}@if (card().unit) {<span class="u">{{ card().unit }}</span>}</div>
      <div class="kpi-foot">
        @if (card().delta) {
          <span class="kpi-delta" [class.up]="card().up !== false" [class.flat]="card().up === false">{{ card().up === false ? '' : '↑' }}{{ card().delta }}</span>
        }
        @if (card().fx) { <span class="fx">{{ card().fx }}</span> }
      </div>
      @if (card().spark?.length) {
        <svg class="kpi-spark" width="64" height="26" viewBox="0 0 64 26">
          <path [attr.d]="sparkPath()" fill="none" [attr.stroke]="card().sc || '#00A8E0'" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity=".85" />
        </svg>
      }
    </div>`,
})
export class KpiTile {
  readonly card = input.required<KpiCard>();

  readonly sparkPath = computed(() => {
    const pts = this.card().spark;
    if (!pts || !pts.length) return '';
    const w = 64, h = 26, mx = Math.max(...pts), mn = Math.min(...pts);
    const xs = (i: number) => (i / (pts.length - 1)) * w;
    const ys = (v: number) => h - ((v - mn) / ((mx - mn) || 1)) * h;
    let d = 'M ' + xs(0).toFixed(1) + ' ' + ys(pts[0]).toFixed(1);
    pts.forEach((v, i) => { if (i) d += ' L ' + xs(i).toFixed(1) + ' ' + ys(v).toFixed(1); });
    return d;
  });
}
