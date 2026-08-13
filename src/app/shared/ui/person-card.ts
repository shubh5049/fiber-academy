import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';
import { NEUTRAL_AVATAR } from '../../core/mock-data';

/** Profile card for a support-team member (instructor/mentor/manager). */
@Component({
  selector: 'app-person-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="person-card clickable-card" (click)="open.emit(name())">
      <span class="pc-av" [style.background-image]="'url(' + (p().pic || neutral) + ')'"></span>
      <div class="pc-role">{{ role() }}</div>
      <div class="pc-name">{{ name() }}</div>
      <div class="pc-meta">{{ p().bio }}<br /><b>{{ p().tenure }}</b></div>
      <div class="pc-contact">
        <button class="btn ghost sm" (click)="$event.stopPropagation(); open.emit(name())">View profile</button>
      </div>
    </div>`,
})
export class PersonCard {
  readonly role = input('');
  readonly name = input.required<string>();
  readonly open = output<string>();
  readonly neutral = NEUTRAL_AVATAR;
  private profiles = inject(ProfileService);
  readonly p = computed(() => this.profiles.profileOf(this.name()));
}
