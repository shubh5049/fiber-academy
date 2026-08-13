import { Routes } from '@angular/router';

/** Lazy-loaded Administrator persona pages. */
export const ADMIN_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.AdminDashboard) },
  { path: 'catalog', loadComponent: () => import('./pages/catalog/catalog').then(m => m.AdminCatalog) },
  { path: 'sequence', loadComponent: () => import('./pages/sequence/sequence').then(m => m.AdminSequence) },
  { path: 'roles', loadComponent: () => import('./pages/roles/roles').then(m => m.AdminRoles) },
  { path: 'users', loadComponent: () => import('./pages/users/users').then(m => m.AdminUsers) },
  { path: 'integrations', loadComponent: () => import('./pages/integrations/integrations').then(m => m.AdminIntegrations) },
  { path: 'forms', loadComponent: () => import('./pages/forms/forms').then(m => m.AdminForms) },
  { path: 'reporting', loadComponent: () => import('./pages/reporting/reporting').then(m => m.AdminReporting) },
  { path: 'notifications', loadComponent: () => import('./pages/notifications/notifications').then(m => m.AdminNotifications) },
  { path: 'logs', loadComponent: () => import('./pages/logs/logs').then(m => m.AdminLogs) },
];
