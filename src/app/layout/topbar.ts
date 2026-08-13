import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Icon } from '../shared/ui/icon';
import { PersonaService } from '../core/services/persona.service';
import { ProfileService } from '../core/services/profile.service';
import { ThemeService } from '../core/services/theme.service';
import { UiService } from '../core/services/ui.service';
import { NAV } from '../core/mock-data';
import { PersonaKey } from '../core/models';
import { NEUTRAL_AVATAR } from '../core/mock-data';

const PLACEHOLDERS: Record<PersonaKey, string> = {
  trainee: 'Search modules...', instructor: 'Search trainees...', mentor: 'Search trainees...',
  manager: 'Search team...', operations: 'Search users, cohorts...', superuser: 'Search program...',
  admin: 'Search config, users...',
};

/** Top bar: mobile menu, search, theme toggle, notifications, persona switcher, profile. */
@Component({
  selector: 'app-topbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  host: { '(document:click)': 'closeMenus()' },
  template: `
    <div class="topbar">
      <button class="menu-btn" (click)="ui.toggleDrawer(); $event.stopPropagation()" aria-label="Menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      </button>

      <div class="search">
        <app-icon name="search" [size]="18" />
        <input [placeholder]="placeholder()" aria-label="Search" autocomplete="off" />
      </div>

      <div class="right-tools">
        <button class="icon-btn" title="Toggle light / dark theme" aria-label="Toggle theme" (click)="theme.toggle()">
          <app-icon [name]="theme.theme() === 'dark' ? 'sun' : 'moon'" [size]="19" />
        </button>

        <div style="position:relative">
          <button class="icon-btn" aria-label="Notifications" (click)="toggleNotif($event)">
            <app-icon name="bell" [size]="19" /><span class="badge-dot"></span>
          </button>
          @if (notifOpen()) {
            <div class="notif-panel show" (click)="$event.stopPropagation()">
              <div class="nh">Notifications <small>{{ persona.notifications().length }} NEW</small></div>
              @for (n of persona.notifications(); track n.t) {
                <div class="notif-row">
                  <div class="ni" [style.background]="n.c + '1f'" [style.color]="n.c"><app-icon [name]="n.ic" [size]="16" /></div>
                  <div><div class="nt">{{ n.t }}</div><div class="ns">{{ n.s }}</div><div class="nw">{{ n.w }}</div></div>
                </div>
              }
            </div>
          }
        </div>

        <button class="topbar-ava" title="My profile" (click)="openProfile()">
          <span class="ta-img" [style.background-image]="'url(' + avatar + ')'"></span>
        </button>

        <div class="persona-switch">
          <button class="ps-btn" (click)="toggleSwitcher($event)">
            <span class="dot" [style.background]="persona.persona().color"></span>
            <span class="ps-name">{{ persona.viewingAs() ? 'Viewing: ' + persona.persona().role : persona.persona().role }}</span>
            <span class="role-badge">VIEW AS</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          @if (switcherOpen()) {
            <div class="ps-menu show" (click)="$event.stopPropagation()">
              <div class="ps-head"><b>Switch persona</b><small>DEMO CONTROL · PREVIEW ANY ROLE</small></div>
              @for (p of persona.personas; track p.key) {
                <button class="ps-opt" [class.active]="p.key === persona.current()" (click)="switchTo(p.key)">
                  <span class="pic" [style.background]="p.color"><app-icon [name]="p.icon" [size]="18" /></span>
                  <span><span class="pn">{{ p.role }}</span><span class="pd">{{ p.name }} — {{ p.desc }}</span></span>
                  @if (p.key === persona.current()) { <span class="cur">VIEWING AS</span> }
                </button>
              }
            </div>
          }
        </div>
      </div>
    </div>`,
})
export class Topbar {
  readonly persona = inject(PersonaService);
  readonly theme = inject(ThemeService);
  readonly ui = inject(UiService);
  private profiles = inject(ProfileService);
  private router = inject(Router);
  readonly avatar = NEUTRAL_AVATAR;

  readonly notifOpen = signal(false);
  readonly switcherOpen = signal(false);
  readonly placeholder = computed(() => PLACEHOLDERS[this.persona.current()]);

  toggleNotif(e: MouseEvent): void { e.stopPropagation(); this.switcherOpen.set(false); this.notifOpen.update(v => !v); }
  toggleSwitcher(e: MouseEvent): void { e.stopPropagation(); this.notifOpen.set(false); this.switcherOpen.update(v => !v); }
  closeMenus(): void { this.notifOpen.set(false); this.switcherOpen.set(false); }
  openProfile(): void { this.profiles.open(this.persona.myName()); }

  switchTo(key: PersonaKey): void {
    const fromSuper = this.persona.current() === 'superuser';
    this.persona.setPersona(key, fromSuper);
    this.switcherOpen.set(false);
    this.router.navigateByUrl(NAV[key][0].path);
  }
}
