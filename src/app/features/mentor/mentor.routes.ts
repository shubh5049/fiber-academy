import { Routes } from '@angular/router';

/** Lazy-loaded Mentor persona pages. */
export const MENTOR_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.MentorDashboard) },
  { path: 'trainees', loadComponent: () => import('./pages/trainees/trainees').then(m => m.MentorTrainees) },
  { path: 'ride-alongs', loadComponent: () => import('./pages/ride-alongs/ride-alongs').then(m => m.MentorRideAlongs) },
  { path: 'evaluations', loadComponent: () => import('./pages/evaluations/evaluations').then(m => m.MentorEvaluations) },
];
