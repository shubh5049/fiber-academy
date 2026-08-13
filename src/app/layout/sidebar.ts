import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Icon } from '../shared/ui/icon';
import { PersonaService } from '../core/services/persona.service';
import { ProfileService } from '../core/services/profile.service';
import { UiService } from '../core/services/ui.service';
import { NEUTRAL_AVATAR } from '../core/mock-data';

/** Persona-themed sidebar: brand + nav + identity footer. */
@Component({
  selector: 'app-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, Icon],
  template: `
    <aside class="sidebar" [class]="'sidebar role-' + persona.current()" [class.open]="ui.drawerOpen()">
      <div class="sb-brand">
        @if (!logoFailed()) {
          <img class="sb-logo" src="images/att_globe.png" alt="AT&T" (error)="logoFailed.set(true)" />
        } @else {
          <div class="sb-logo-fb" style="display:grid">
            <svg viewBox="0 0 32 32" fill="none" stroke="#00A8E0" stroke-width="2"><circle cx="16" cy="16" r="11"/><path d="M5 16h22M16 5c4 3.5 4 18.5 0 22M16 5c-4 3.5-4 18.5 0 22"/></svg>
          </div>
        }
        <div class="sb-brandtxt"><h1>Fiber Academy</h1><div class="sub">AT&T Future Fiber</div></div>
      </div>
      <div class="sb-menu-label">MENU</div>
      <nav class="sb-nav">
        @for (n of persona.nav(); track n.path) {
          <a class="sb-link" [routerLink]="n.path" routerLinkActive="active" (click)="ui.closeDrawer()">
            <app-icon [name]="n.icon" [size]="19" />{{ n.label }}
          </a>
        }
      </nav>
      <button class="sb-foot" title="View & edit your profile" (click)="openOwnProfile()">
        <span class="ava" [style.background-image]="'url(' + avatar + ')'" style="background-size:cover"></span>
        <div class="who">{{ persona.persona().name }}<small>{{ persona.persona().role }} · Edit profile ›</small></div>
      </button>
    </aside>`,
})
export class Sidebar {
  readonly persona = inject(PersonaService);
  readonly ui = inject(UiService);
  private profiles = inject(ProfileService);
  readonly logoFailed = signal(false);
  readonly avatar = NEUTRAL_AVATAR;

  openOwnProfile(): void {
    this.profiles.open(this.persona.myName());
  }
}
