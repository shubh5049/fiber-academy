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
  imports: [
    RouterOutlet,
    Sidebar,
    Topbar,
    AtlasFab,
    Toast,
    ProfileModal,
    TraineeDetailModal,
    EvalFormModal,
    Icon,
  ],
  template: `
    <div class="app">
      <app-sidebar />

      <main class="main">
        <app-topbar />

        @if (persona.viewingAs()) {
          <div class="ro-ribbon">
            <app-icon name="eye" [size]="16" />
            Read-only oversight — viewing as <b>{{ persona.persona().role }}</b>.
            Edits are disabled.
            <button (click)="exitViewAs()">Exit</button>
          </div>
        }

        <div class="scroll">

          @if (!(persona.current() === 'trainee' && router.url === '/trainee/dashboard')) {
            <div class="role-tag">
              <span
                class="d"
                [style.background]="persona.persona().color">
              </span>

              {{ persona.persona().role }} · {{ pageLabel() }}
            </div>
          }

          <router-outlet />

        </div>
      </main>
    </div>

    <app-toast />
    <app-profile-modal />
    <app-trainee-detail-modal />
    <app-eval-form-modal />
    <app-atlas-fab />
  `,
})
export class App {
  readonly persona = inject(PersonaService);
  readonly router = inject(Router);

  exitViewAs(): void {
    this.persona.setPersona('superuser', false);
    this.router.navigateByUrl('/superuser/overview');
  }

    pageLabel(): string {
    const url = this.router.url;

    if (url.includes('/my-climb')) return 'Learning Journey';
    if (url.includes('/courses')) return 'Self Paced Courses';
    if (url.includes('/schedule')) return 'Schedule';
    if (url.includes('/progress')) return 'Progress & Certification';
    if (url.includes('/people')) return 'People';
    if (url.includes('/resources')) return 'Resources';

    if (url.includes('/cohorts')) return 'Cohorts';
    if (url.includes('/attendance')) return 'Attendance';
    if (url.includes('/assessments')) return 'Assessments';
    if (url.includes('/sessions')) return 'Live Sessions';
    if (url.includes('/reports')) return 'Reports';

    if (url.includes('/trainees')) return 'My Trainees';
    if (url.includes('/ride-alongs')) return 'Ride-Alongs';
    if (url.includes('/evaluations')) return 'Evaluations';

    if (url.includes('/team')) return 'My Team';
    if (url.includes('/graduated')) return 'Lifecycle';

    if (url.includes('/enrollment')) return 'Enrollment';
    if (url.includes('/mentors')) return 'Mentor Assignment';
    if (url.includes('/scheduling')) return 'Ride-Along Scheduling';
    if (url.includes('/records')) return 'Records & Overrides';

    if (url.includes('/overview')) return 'Program Overview';
    if (url.includes('/view-as')) return 'View As';

    if (url.includes('/catalog')) return 'Course Catalog';
    if (url.includes('/sequence')) return 'Course Sequence';
    if (url.includes('/roles')) return 'Roles & Permissions';
    if (url.includes('/integrations')) return 'Integrations';
    if (url.includes('/forms')) return 'Form Builder';
    if (url.includes('/reporting')) return 'Reporting Config';
    if (url.includes('/notifications')) return 'Notifications';
    if (url.includes('/logs')) return 'Audit Logs';

    return '';
  }
}