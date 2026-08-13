import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Icon } from './icon';
import { ToastService } from '../../core/services/toast.service';

/** Global toast host — renders the current transient message. */
@Component({
  selector: 'app-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    @if (toast.current(); as t) {
      <div class="toast show">
        <div class="tc"><app-icon name="check" [size]="17" [strokeWidth]="3" /></div>
        <div>{{ t.msg }}@if (t.sub) {<small>{{ t.sub }}</small>}</div>
      </div>
    }`,
})
export class Toast {
  readonly toast = inject(ToastService);
}
