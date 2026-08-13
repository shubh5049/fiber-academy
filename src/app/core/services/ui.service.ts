import { Injectable, signal } from '@angular/core';

/** Small cross-component UI state (mobile drawer, Atlas panel). */
@Injectable({ providedIn: 'root' })
export class UiService {
  readonly drawerOpen = signal(false);
  readonly atlasOpen = signal(false);

  toggleDrawer(): void { this.drawerOpen.update(v => !v); }
  closeDrawer(): void { this.drawerOpen.set(false); }
  toggleAtlas(): void { this.atlasOpen.update(v => !v); }
}
