import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';
import { NEUTRAL_AVATAR } from '../../core/mock-data';

/** Round avatar for a person. Uses the person's profile picture (neutral by
 *  default). Clickable to open the profile modal when `linked` is set. */
@Component({
  selector: 'app-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="ava-img" role="img" [attr.aria-label]="name()"
      [style.width.px]="size()" [style.height.px]="size()" [style.background-image]="bg()"></span>`,
  styles: `:host{display:inline-flex}`,
})
export class Avatar {
  readonly name = input('');
  readonly size = input(40);
  private profiles = inject(ProfileService);
  readonly bg = computed(() => `url('${this.profiles.profileOf(this.name()).pic || NEUTRAL_AVATAR}')`);
}
