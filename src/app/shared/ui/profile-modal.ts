import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Icon } from './icon';
import { ProfileService } from '../../core/services/profile.service';
import { PersonaService } from '../../core/services/persona.service';
import { ToastService } from '../../core/services/toast.service';
import { NEUTRAL_AVATAR } from '../../core/mock-data';

interface Draft { bio: string; facts: string; loc: string; email: string; pic: string | null; }

/** View-any / edit-own profile modal, driven by ProfileService state. */
@Component({
  selector: 'app-profile-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    @if (svc.openName(); as name) {
      <div class="modal-bg show" (click)="onBackdrop($event)">
        <div class="modal">
          <div class="modal-head">
            <div class="mh-ic"><app-icon name="user" [size]="22" /></div>
            <div style="min-width:0">
              <h3>{{ svc.editing() ? 'Edit profile' : (isOwn() ? 'My profile' : 'Profile') }}</h3>
              <p>{{ name }}</p>
            </div>
            <button class="x" (click)="svc.close()"><app-icon name="x" [size]="18" /></button>
          </div>

          <div class="modal-body">
            @if (!svc.editing()) {
              <div class="prof-hero" [style.--acc]="p().color">
                <span class="prof-hero-av" [style.background-image]="'url(' + (p().pic || neutral) + ')'"></span>
                <div class="prof-hero-txt">
                  <div class="prof-role">{{ p().role }}</div>
                  <div class="prof-name">{{ name }}@if (isOwn()) { <span class="you-tag">You</span> }</div>
                  <div class="prof-meta">{{ metaLine() }}</div>
                </div>
                @if (isOwn()) {
                  <button class="btn sm prof-edit-btn" (click)="startEdit()"><app-icon name="edit" [size]="15" />Edit profile</button>
                }
              </div>
              <div class="prof-section"><div class="prof-label">About</div><p class="prof-bio">{{ p().bio || 'No bio yet.' }}</p></div>
              @if (p().facts.length) {
                <div class="prof-section"><div class="prof-label">Fun facts</div>
                  <div class="fact-row">@for (f of p().facts; track f) { <span class="fact-chip">{{ f }}</span> }</div>
                </div>
              }
              @if (p().email) {
                <div class="prof-section"><div class="prof-label">Contact</div>
                  <div class="prof-contact"><app-icon name="mail" [size]="16" />{{ p().email }}</div>
                </div>
              }
            } @else if (draft(); as d) {
              <div class="prof-edit-hero" [style.--acc]="p().color">
                <div class="avatar-edit">
                  <span class="prof-hero-av" [style.background-image]="'url(' + (d.pic || neutral) + ')'"></span>
                  <label class="avatar-cam" title="Change picture">
                    <app-icon name="edit" [size]="16" />
                    <input type="file" accept="image/*" hidden (change)="onFile($event)" />
                  </label>
                </div>
                <div style="flex:1">
                  <div class="prof-role">{{ p().role }}</div>
                  <div class="prof-name">{{ name }}</div>
                  <div class="prof-meta">Tap the camera to upload a photo</div>
                </div>
              </div>
              <div class="fld"><label>Bio</label>
                <textarea maxlength="240" [value]="d.bio" (input)="patch('bio', $any($event.target).value)" placeholder="Tell your cohort a bit about you..."></textarea>
                <div class="charhint">{{ d.bio.length }}/240</div>
              </div>
              <div class="fld"><label>Fun facts <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--text-soft)">— comma separated</span></label>
                <input [value]="d.facts" (input)="patch('facts', $any($event.target).value)" placeholder="Plays guitar, Weekend hiker, Dog person" />
              </div>
              <div class="fld-row">
                <div class="fld"><label>Location</label><input [value]="d.loc" (input)="patch('loc', $any($event.target).value)" /></div>
                <div class="fld"><label>Contact email</label><input [value]="d.email" (input)="patch('email', $any($event.target).value)" /></div>
              </div>
            }
          </div>

          <div class="modal-foot">
            @if (svc.editing()) {
              <button class="btn ghost" (click)="svc.open(name)">Cancel</button>
              <button class="btn" (click)="save(name)"><app-icon name="check" [size]="15" [strokeWidth]="2.4" />Save changes</button>
            } @else {
              <button class="btn ghost" (click)="svc.close()">Close</button>
              @if (!isOwn()) {
                <button class="btn" (click)="message(name)"><app-icon name="bell" [size]="15" />Message</button>
              }
            }
          </div>
        </div>
      </div>
    }`,
})
export class ProfileModal {
  readonly svc = inject(ProfileService);
  private persona = inject(PersonaService);
  private toast = inject(ToastService);
  readonly neutral = NEUTRAL_AVATAR;

  readonly p = computed(() => this.svc.profileOf(this.svc.openName() ?? ''));
  readonly isOwn = computed(() => this.svc.openName() === this.persona.myName());
  readonly metaLine = computed(() => [this.p().tenure, this.p().loc].filter(Boolean).join(' · '));
  readonly draft = signal<Draft | null>(null);

  startEdit(): void {
    const p = this.p();
    this.draft.set({ bio: p.bio, facts: p.facts.join(', '), loc: p.loc, email: p.email, pic: p.pic });
    this.svc.edit();
  }
  patch(key: keyof Draft, value: string): void {
    this.draft.update(d => d ? { ...d, [key]: value } : d);
  }
  onFile(e: Event): void {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (!f || !f.type.startsWith('image/')) { this.toast.show("That file isn't an image", 'Pick a JPG or PNG'); return; }
    const reader = new FileReader();
    reader.onload = ev => this.patch('pic', String(ev.target?.result ?? ''));
    reader.readAsDataURL(f);
  }
  save(name: string): void {
    const d = this.draft();
    if (!d) return;
    this.svc.save(name, {
      bio: d.bio.trim(), loc: d.loc.trim(), email: d.email.trim(), pic: d.pic,
      facts: d.facts.split(',').map(s => s.trim()).filter(Boolean),
    });
    this.toast.show('Profile saved', 'Your cohort will see your updated profile');
  }
  message(name: string): void {
    this.svc.close();
    this.toast.show('Message sent', name + ' will get back to you');
  }
  onBackdrop(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('modal-bg')) this.svc.close();
  }
}
