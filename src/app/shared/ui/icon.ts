import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ICONS } from '../../core/icons';

/** Inline SVG icon from the shared registry. Inherits color via currentColor. */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      [attr.stroke-width]="strokeWidth()" stroke-linecap="round" stroke-linejoin="round"
      [style.width.px]="size()" [style.height.px]="size()" [innerHTML]="paths()"></svg>`,
  styles: `:host{display:inline-flex;line-height:0}`,
})
export class Icon {
  readonly name = input.required<string>();
  readonly size = input(20);
  readonly strokeWidth = input(2);
  private san = inject(DomSanitizer);
  readonly paths = computed<SafeHtml>(() => this.san.bypassSecurityTrustHtml(ICONS[this.name()] ?? ''));
}
