import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { rowbarClass } from '../../core/util';

/** Inline mini progress bar used in roster tables. Color keys off the value. */
@Component({
  selector: 'app-rowbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span [class]="'rowbar ' + cls()"><i [style.width.%]="pr()"></i></span>`,
  styles: `:host{display:inline-flex;vertical-align:middle}`,
})
export class RowBar {
  readonly pr = input(0);
  readonly cls = computed(() => rowbarClass(this.pr()));
}
