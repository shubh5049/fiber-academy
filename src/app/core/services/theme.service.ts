import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

/** Light/dark theme state. Persists to localStorage and reflects onto
 *  <html data-theme> so the global CSS theme layer applies. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private read(): Theme {
    try { return (localStorage.getItem('fa-theme') as Theme) || 'light'; } catch { return 'light'; }
  }
  readonly theme = signal<Theme>(this.read());

  constructor() {
    effect(() => {
      const t = this.theme();
      document.documentElement.dataset['theme'] = t;
      try { localStorage.setItem('fa-theme', t); } catch { /* ignore */ }
    });
  }

  toggle(): void {
    this.theme.update(t => (t === 'dark' ? 'light' : 'dark'));
  }
}
