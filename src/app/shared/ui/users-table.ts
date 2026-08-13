import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RoleTag } from './role-tag';
import { Avatar } from './avatar';
import { Icon } from './icon';
import { ToastService } from '../../core/services/toast.service';

interface UserRow { name: string; role: string; assign: string; status: string; }

const USERS: UserRow[] = [
  { name: 'Dane Johnson', role: 'Trainee', assign: 'July-07', status: 'Active' },
  { name: 'Tomás Nguyen', role: 'Instructor', assign: 'July-07, June-23', status: 'Active' },
  { name: 'Rob Castillo', role: 'Mentor', assign: '—', status: 'Active' },
  { name: 'Denise Park', role: 'Manager', assign: '—', status: 'Active' },
  { name: 'Sana Malik', role: 'Operations', assign: '—', status: 'Active' },
  { name: 'Q. Green', role: 'Super User', assign: 'All', status: 'Active' },
  { name: 'Drew Walsh', role: 'Trainee', assign: 'July-07', status: 'Active' },
  { name: 'Old Account', role: 'Trainee', assign: 'May-12', status: 'Disabled' },
];

/** Reusable Users / access-management page (operations / admin). */
@Component({
  selector: 'app-users-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RoleTag, Avatar, Icon],
  template: `
    <app-role-tag [text]="who() + ' · User management'" />
    <h1 class="page-h">Users</h1>
    <p class="page-sub">Manage accounts and access. Create, edit, or disable users across all roles.</p>
    <div style="display:flex;justify-content:flex-end;margin-bottom:14px">
      <button class="btn" (click)="toast.show('New user', 'Opens user creation')"><app-icon name="plus" [size]="18" [strokeWidth]="2.4" />New user</button>
    </div>
    <div class="tbl-wrap"><table class="grid"><thead><tr><th>User</th><th>Role</th><th>Assignment</th><th>Status</th><th></th></tr></thead><tbody>
      @for (u of users; track u.name) {
        <tr>
          <td><div class="cell-name"><app-avatar [name]="u.name" [size]="30" />{{ u.name }}</div></td>
          <td>{{ u.role }}</td>
          <td style="font-size:12px;color:var(--text-soft)">{{ u.assign }}</td>
          <td>@if (u.status === 'Active') { <span class="pill green">Active</span> } @else { <span class="pill grey">Disabled</span> }</td>
          <td style="text-align:right"><button class="btn ghost sm" (click)="toast.show('Editing ' + u.name)"><app-icon name="edit" [size]="16" /></button></td>
        </tr>
      }
    </tbody></table></div>`,
})
export class UsersTable {
  readonly who = input('');
  readonly users = USERS;
  readonly toast = inject(ToastService);
}
