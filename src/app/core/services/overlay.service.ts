import { Injectable, signal } from '@angular/core';

/** Cross-persona overlay state: the shell mounts the trainee-detail and
 *  eval-form modals once; any page opens them via these signals. */
@Injectable({ providedIn: 'root' })
export class OverlayService {
  readonly traineeId = signal<string | null>(null);
  readonly evalId = signal<string | null>(null);

  openTrainee(id: string): void { this.traineeId.set(id); }
  closeTrainee(): void { this.traineeId.set(null); }
  openEval(id: string): void { this.evalId.set(id); }
  closeEval(): void { this.evalId.set(null); }
}
