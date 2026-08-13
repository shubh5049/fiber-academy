import { Routes } from '@angular/router';

/** Lazy-loaded Manager persona pages. */
export const MANAGER_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.ManagerDashboard) },
  { path: 'team', loadComponent: () => import('./pages/team/team').then(m => m.ManagerTeam) },
  { path: 'reports', loadComponent: () => import('./pages/reports/reports').then(m => m.ManagerTeam) },
  { path: 'graduated', loadComponent: () => import('./pages/graduated/graduated').then(m => m.ManagerGraduated) },
];
