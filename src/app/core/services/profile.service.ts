import { Injectable, signal } from '@angular/core';
import { Profile } from '../models';
import { buildProfiles } from '../mock-data';

const FALLBACK: Profile = { role: 'Team member', persona: null, color: '#5d7783', tenure: '', loc: '', email: '', bio: '', facts: [], pic: null };

/** Every person's profile (single source of truth) + the profile-modal open state.
 *  A single <app-profile-modal> in the shell reacts to `openName`. */
@Injectable({ providedIn: 'root' })
export class ProfileService {
  readonly profiles = signal<Record<string, Profile>>(buildProfiles());
  readonly openName = signal<string | null>(null);
  readonly editing = signal(false);

  profileOf(name: string): Profile {
    return this.profiles()[name] ?? FALLBACK;
  }

  open(name: string): void { this.openName.set(name); this.editing.set(false); }
  edit(): void { this.editing.set(true); }
  close(): void { this.openName.set(null); this.editing.set(false); }

  save(name: string, patch: Partial<Profile>): void {
    this.profiles.update(p => ({ ...p, [name]: { ...p[name], ...patch } }));
    this.editing.set(false);
  }
}
