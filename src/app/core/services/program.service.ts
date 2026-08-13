import { Injectable, computed, inject, signal } from '@angular/core';
import { Module, ModuleStatus, Trainee, Cohort, Checkpoint, RideAlong } from '../models';
import { MODULES, TRAINEES, COHORTS, CHECKPOINTS, RIDEALONGS } from '../mock-data';
import { ToastService } from './toast.service';

/** Program state: the 8-week module journey + cohort/roster/assessment data.
 *  All reactive via signals so any widget can bind to derived values. */
@Injectable({ providedIn: 'root' })
export class ProgramService {
  private toast = inject(ToastService);

  readonly modules = signal<Module[]>(MODULES.map(m => ({ ...m })));
  readonly trainees = signal<Trainee[]>(TRAINEES);
  readonly cohorts = signal<Cohort[]>(COHORTS);
  readonly checkpoints = signal<Checkpoint[]>(CHECKPOINTS);
  readonly rideAlongs = signal<RideAlong[]>(RIDEALONGS);

  readonly doneCount = computed(() => this.modules().filter(m => m.done).length);
  readonly total = computed(() => this.modules().length);
  readonly pct = computed(() => Math.round((this.doneCount() / this.total()) * 100));
  readonly checkpointsPassed = computed(() => this.checkpoints().filter(c => c.status === 'pass').length);

  /** index of the first not-done module (the "current" one). */
  private firstOpenIndex = computed(() => this.modules().findIndex(m => !m.done));
  readonly currentModule = computed<Module | null>(() => {
    const i = this.firstOpenIndex();
    return i < 0 ? null : this.modules()[i];
  });
  readonly currentWeek = computed(() => this.currentModule()?.wk ?? 8);

  /** Status of the module at index i: done | current | locked. */
  statusOf(i: number): ModuleStatus {
    const mods = this.modules();
    if (mods[i].done) return 'done';
    return i === this.firstOpenIndex() ? 'current' : 'locked';
  }

  cohort(name: string): Cohort | undefined {
    return this.cohorts().find(c => c.name === name);
  }
  traineesIn(cohort: string): Trainee[] {
    return this.trainees().filter(t => t.cohort === cohort);
  }

  /** Submit a ride-along evaluation (mentor) — writes to the trainee's record. */
  submitEval(rideId: string, score: number, notes: string): void {
    this.rideAlongs.update(list => list.map(r =>
      r.id === rideId ? { ...r, score, notes: notes || 'Evaluation submitted.', status: 'completed' as const } : r));
    const r = this.rideAlongs().find(x => x.id === rideId);
    this.toast.show('Evaluation submitted', "Saved to " + (r ? r.trainee : 'trainee') + "'s permanent record");
  }

  /** Launch a self-paced module (Award LS deeplink) and mark it complete. */
  launchModule(id: number): void {
    const mods = this.modules();
    const m = mods.find(x => x.id === id);
    if (!m) return;
    window.open('https://www.youtube.com/watch?v=' + m.yt, '_blank', 'noopener');
    if (!m.done) {
      this.modules.update(list => list.map(x =>
        x.id === id
          ? { ...x, done: true, date: x.date ?? new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }
          : x));
      this.toast.show(m.name + ' complete!', 'Progress synced from Award Learning System · +' + Math.round(100 / this.total()) + '%');
    }
  }
}
