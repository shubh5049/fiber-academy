import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from './icon';

/** Content panel with an optional icon heading and right-aligned label. */
@Component({
  selector: 'app-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <div class="panel" [style.margin]="margin()" [style.background]="background() || null">
      @if (heading()) {
        <h4>
          @if (icon()) { <app-icon [name]="icon()!" [size]="19" /> }
          {{ heading() }}
          @if (right()) { <span class="h4-right">{{ right() }}</span> }
        </h4>
      }
      <ng-content />
    </div>`,
})
export class Panel {
  readonly heading = input<string>();
  readonly icon = input<string>();
  readonly right = input<string>();
  readonly margin = input('0 0 16px');
  readonly background = input<string>();
}
