import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PillVariant } from '../../core/models';

/** Small status pill. */
@Component({
  selector: 'app-pill',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span [class]="'pill ' + variant()">{{ text() }}</span>`,
})
export class Pill {
  readonly variant = input<PillVariant>('blue');
  readonly text = input('');
}
