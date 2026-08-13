import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Section header: title + optional tag chip + rule line. */
@Component({
  selector: 'app-section-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="section-h" [style.margin-top.px]="marginTop()">
      <h3>{{ title() }}</h3>
      @if (tag()) { <span class="tag">{{ tag() }}</span> }
      <div class="ln"></div>
    </div>`,
})
export class SectionHeader {
  readonly title = input.required<string>();
  readonly tag = input<string>();
  readonly marginTop = input<number | null>(null);
}
