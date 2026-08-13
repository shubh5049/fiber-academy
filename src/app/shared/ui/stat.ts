import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from './icon';

/** Compact stat card (icon chip + label + value/unit). */
@Component({
  selector: 'app-stat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <div class="stat">
      <div class="si" [style.background]="bg()" [style.color]="color()"><app-icon [name]="icon()" [size]="24" /></div>
      <div>
        <div class="sl">{{ label() }}</div>
        <div class="sv" [style.font-size.px]="valueSize()">{{ value() }}@if (unit()) {<span>{{ unit() }}</span>}</div>
      </div>
    </div>`,
})
export class Stat {
  readonly icon = input('chart');
  readonly label = input('');
  readonly value = input<string | number>('');
  readonly unit = input<string>();
  readonly bg = input('#e6f4fb');
  readonly color = input('#0568ae');
  readonly valueSize = input<number | null>(null);
}
