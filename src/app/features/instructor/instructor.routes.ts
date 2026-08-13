import { Routes } from '@angular/router';

/** Lazy-loaded Instructor persona pages. */
export const INSTRUCTOR_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.InstructorDashboard) },
  { path: 'cohorts', loadComponent: () => import('./pages/cohorts/cohorts').then(m => m.InstructorCohorts) },
  { path: 'attendance', loadComponent: () => import('./pages/attendance/attendance').then(m => m.InstructorAttendance) },
  { path: 'assessments', loadComponent: () => import('./pages/assessments/assessments').then(m => m.InstructorAssessments) },
  { path: 'sessions', loadComponent: () => import('./pages/sessions/sessions').then(m => m.InstructorSessions) },
  { path: 'reports', loadComponent: () => import('./pages/reports/reports').then(m => m.InstructorReports) },
];
