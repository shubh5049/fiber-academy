import { Injectable, computed, signal } from '@angular/core';
import { Persona, PersonaKey, NavItem, Notif } from '../models';
import { PERSONAS, NAV, NOTIFS } from '../mock-data';

/** Active persona + navigation. Super User can "view as" another persona
 *  (read-only oversight). Route navigation is handled by the layout. */
@Injectable({ providedIn: 'root' })
export class PersonaService {
  readonly personas = PERSONAS;
  readonly current = signal<PersonaKey>('trainee');
  /** true when Super User is previewing another persona (read-only). */
  readonly viewingAs = signal(false);

  readonly persona = computed<Persona>(() => this.personas.find(p => p.key === this.current())!);
  readonly nav = computed<NavItem[]>(() => NAV[this.current()]);
  readonly notifications = computed<Notif[]>(() => NOTIFS[this.current()]);
  readonly myName = computed(() => this.persona().name);

  byKey(key: PersonaKey): Persona {
    return this.personas.find(p => p.key === key)!;
  }

  setPersona(key: PersonaKey, fromSuper = false): void {
    this.current.set(key);
    this.viewingAs.set(fromSuper && key !== 'superuser');
  }
}
