import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PersonaService } from '../core/services/persona.service';
import { RoleTag } from '../shared/ui/role-tag';
import { Icon } from '../shared/ui/icon';

/** Placeholder for personas not yet ported. The Trainee persona is the fully
 *  built reference; the rest reuse the same shared widgets as they land. */
@Component({
  selector: 'app-coming-soon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RoleTag, Icon],
  template: `
    <app-role-tag [text]="persona.persona().role + ' · Preview'" />
    <h1 class="page-h">{{ persona.persona().role }} workspace</h1>
    <p class="page-sub">This first Angular slice ships the <b>Trainee</b> persona in full as the reference pattern. {{ persona.persona().role }} screens are ported next, reusing the same decoupled widget kit.</p>
    <div class="panel" style="max-width:660px">
      <h4><app-icon name="layers" [size]="19" />Coming soon</h4>
      <p>Switch to <b>Trainee</b> from the persona control in the top-right to explore the completed experience, or check back as {{ persona.persona().role }} views are added.</p>
    </div>`,
})
export class ComingSoon {
  readonly persona = inject(PersonaService);
}
