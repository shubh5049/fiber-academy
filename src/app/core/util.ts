import { PillVariant, Trainee } from './models';

/** Status pill for a trainee's overall standing. */
export function statusPill(t: Trainee): { text: string; variant: PillVariant } {
  if (t.status === 'at-risk') return { text: 'At risk', variant: 'red' };
  if (t.status === 'grad') return { text: 'Graduated', variant: 'purple' };
  if (t.pr >= 100) return { text: 'Complete', variant: 'green' };
  return { text: 'On track', variant: 'blue' };
}

/** Row progress-bar color class by percentage. */
export function rowbarClass(pr: number): string {
  return pr >= 85 ? 'green' : pr >= 65 ? '' : pr >= 50 ? 'amber' : 'red';
}
