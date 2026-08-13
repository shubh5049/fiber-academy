import { Routes } from '@angular/router';

/** Lazy-loaded Operations persona pages. */
export const OPERATIONS_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.OperationsDashboard) },
  { path: 'enrollment', loadComponent: () => import('./pages/enrollment/enrollment').then(m => m.OperationsEnrollment) },
  { path: 'cohorts', loadComponent: () => import('./pages/cohorts/cohorts').then(m => m.OperationsCohorts) },
  { path: 'mentors', loadComponent: () => import('./pages/mentors/mentors').then(m => m.OperationsMentors) },
  { path: 'scheduling', loadComponent: () => import('./pages/scheduling/scheduling').then(m => m.OperationsScheduling) },
  { path: 'records', loadComponent: () => import('./pages/records/records').then(m => m.OperationsRecords) },
  { path: 'users', loadComponent: () => import('./pages/users/users').then(m => m.OperationsUsers) },
];
