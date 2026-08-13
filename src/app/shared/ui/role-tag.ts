import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { PersonaService } from '../../core/services/persona.service';

/** Small persona-colored "role · context" tag shown atop feature pages. */
@Component({
  selector: 'app-role-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="role-tag"><span class="d" [style.background]="color()"></span>{{ text() }}</div>`,
})
export class RoleTag {
  readonly text = input('');
  private persona = inject(PersonaService);
  readonly color = computed(() => this.persona.persona().color);
}
