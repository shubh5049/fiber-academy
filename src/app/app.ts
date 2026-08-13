import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Sidebar } from './layout/sidebar';
import { Topbar } from './layout/topbar';
import { AtlasFab } from './layout/atlas-fab';
import { Toast } from './shared/ui/toast';
import { ProfileModal } from './shared/ui/profile-modal';
import { TraineeDetailModal } from './shared/ui/trainee-detail-modal';
import { EvalFormModal } from './shared/ui/eval-form-modal';
import { Icon } from './shared/ui/icon';
import { PersonaService } from './core/services/persona.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Sidebar, Topbar, AtlasFab, Toast, ProfileModal, TraineeDetailModal, EvalFormModal, Icon],
  template: `
    <div class="app">
      <app-sidebar />
      <main class="main">
        <app-topbar />
        @if (persona.viewingAs()) {
          <div class="ro-ribbon">
            <app-icon name="eye" [size]="16" />
            Read-only oversight — viewing as <b>{{ persona.persona().role }}</b>. Edits are disabled.
            <button (click)="exitViewAs()">Exit</button>
          </div>
        }
        <div class="scroll"><router-outlet /></div>
      </main>
    </div>
    <app-toast />
    <app-profile-modal />
    <app-trainee-detail-modal />
    <app-eval-form-modal />
    <app-atlas-fab />`,
})
export class App {
  readonly persona = inject(PersonaService);
  private router = inject(Router);

  exitViewAs(): void {
    this.persona.setPersona('superuser', false);
    this.router.navigateByUrl('/superuser/overview');
  }
}
