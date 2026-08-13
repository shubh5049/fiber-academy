import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from './icon';
import { Pill } from './pill';
import { ListRow as RowItem } from '../../core/models';

/** A list row: icon chip + title/sub + optional pill and right-aligned "when". */
@Component({
  selector: 'app-list-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Pill],
  template: `
    <div class="list-row">
      <div class="lr-ic" [style.background]="row().iconBg || null" [style.color]="row().iconColor || null">
        <app-icon [name]="row().icon" [size]="21" />
      </div>
      <div class="lr-main">
        <div class="lr-t">{{ row().title }}</div>
        @if (row().sub) { <div class="lr-s">{{ row().sub }}</div> }
      </div>
      @if (row().pill || row().when) {
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px">
          @if (row().pill) { <app-pill [variant]="row().pill!.variant" [text]="row().pill!.text" /> }
          @if (row().when) { <span class="lr-when">{{ row().when }}</span> }
        </div>
      }
    </div>`,
})
export class ListRow {
  readonly row = input.required<RowItem>();
}
