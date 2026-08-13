import { Routes, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { PersonaService } from './core/services/persona.service';
import { PersonaKey } from './core/models';

/** Keep the active persona in sync with the URL (so the sidebar matches),
 *  without disturbing the Super User "view as" flag (owned by the switcher). */
const syncPersona = (key: PersonaKey): CanActivateFn => () => {
  inject(PersonaService).current.set(key);
  return true;
};

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'trainee/dashboard' },
  { path: 'trainee', canActivate: [syncPersona('trainee')], loadChildren: () => import('./features/trainee/trainee.routes').then(m => m.TRAINEE_ROUTES) },
  { path: 'instructor', canActivate: [syncPersona('instructor')], loadChildren: () => import('./features/instructor/instructor.routes').then(m => m.INSTRUCTOR_ROUTES) },
  { path: 'mentor', canActivate: [syncPersona('mentor')], loadChildren: () => import('./features/mentor/mentor.routes').then(m => m.MENTOR_ROUTES) },
  { path: 'manager', canActivate: [syncPersona('manager')], loadChildren: () => import('./features/manager/manager.routes').then(m => m.MANAGER_ROUTES) },
  { path: 'operations', canActivate: [syncPersona('operations')], loadChildren: () => import('./features/operations/operations.routes').then(m => m.OPERATIONS_ROUTES) },
  { path: 'superuser', canActivate: [syncPersona('superuser')], loadChildren: () => import('./features/superuser/superuser.routes').then(m => m.SUPERUSER_ROUTES) },
  { path: 'admin', canActivate: [syncPersona('admin')], loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES) },
  { path: '**', redirectTo: 'trainee/dashboard' },
];
