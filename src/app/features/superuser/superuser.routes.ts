import { Routes } from '@angular/router';

/** Lazy-loaded Super User persona pages. */
export const SUPERUSER_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  { path: 'overview', loadComponent: () => import('./pages/overview/overview').then(m => m.SuperuserOverview) },
  { path: 'reports', loadComponent: () => import('./pages/reports/reports').then(m => m.SuperuserReports) },
  { path: 'cohorts', loadComponent: () => import('./pages/cohorts/cohorts').then(m => m.SuperuserCohorts) },
  { path: 'view-as', loadComponent: () => import('./pages/view-as/view-as').then(m => m.SuperuserViewAs) },
];
