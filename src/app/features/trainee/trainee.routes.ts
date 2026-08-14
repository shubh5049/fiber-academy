import { Routes } from '@angular/router';

/** Lazy-loaded Trainee persona pages. Each page is a standalone component
 *  composed from the shared widget kit. */
export const TRAINEE_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.TraineeDashboard) },
  { path: 'my-climb', loadComponent: () => import('./pages/my-climb/my-climb').then(m => m.MyClimbComponent) },
  {path: 'courses', loadComponent: () => import('./pages/courses/courses').then(m => m.Courses) },
  { path: 'schedule', loadComponent: () => import('./pages/schedule/schedule').then(m => m.Schedule) },
  { path: 'progress', loadComponent: () => import('./pages/progress/progress').then(m => m.Progress) },
  { path: 'people', loadComponent: () => import('./pages/people/people').then(m => m.People) },
  { path: 'resources', loadComponent: () => import('./pages/resources/resources').then(m => m.Resources) },
];
