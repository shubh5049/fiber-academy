import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Icon } from '../shared/ui/icon';
import { PersonaService } from '../core/services/persona.service';
import { ToastService } from '../core/services/toast.service';
import { UiService } from '../core/services/ui.service';
import { PersonaKey } from '../core/models';

const INTRO: Record<PersonaKey, string> = {
  trainee: "Hi Johnson 👋 I'm <b>Atlas</b>, your training assistant. Ask me about your modules, schedule, ride-alongs, or what's next.",
  instructor: "Hi Tomás 👋 I'm <b>Atlas</b>. Ask me about your cohorts, who's at risk, or this week's checkpoints.",
  mentor: "Hey Rob 👋 I'm <b>Atlas</b>. Ask me about your ride-alongs, assigned trainees, or evaluations due.",
  manager: "Hi Denise 👋 I'm <b>Atlas</b>. Ask me about your team's progress, off-track alerts, or reports.",
  operations: "Hi Sana 👋 I'm <b>Atlas</b>. Ask me about enrollment, cohorts, mentor assignments, or scheduling.",
  superuser: "Hi Q 👋 I'm <b>Atlas</b>. Ask me about program KPIs, cohorts, or graduation trends.",
  admin: "Hi 👋 I'm <b>Atlas</b>. Ask me about courses, roles, integrations, or the audit log.",
};
const CHIPS: Record<PersonaKey, string[]> = {
  trainee: ["What's in Week 5?", 'How do ride-alongs work?', "What's left to certify?"],
  instructor: ["Who's at risk?", 'What checkpoints are due?', 'Summarize July-07'],
  mentor: ['What ride-alongs this week?', 'Which evals are due?', "How's Dane doing?"],
  manager: ["Who's off track?", 'Team progress summary', 'When do they graduate?'],
  operations: ['Any scheduling conflicts?', 'Who needs a mentor?', 'Pending enrollments?'],
  superuser: ['On-time graduation rate?', 'Compare cohorts', 'Program NPS?'],
  admin: ['Integration status?', 'Recent audit events', 'Role permissions'],
};

/** Ask Atlas assistant — persona-aware widget. (Live AI wiring pending activation.) */
@Component({
  selector: 'app-atlas-fab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <button class="atlas-fab" [class.hidden]="ui.atlasOpen()" (click)="ui.toggleAtlas()" aria-label="Open Ask Atlas">
      <span class="lbl">Ask Atlas</span>
      <span class="orb"><app-icon name="bot" [size]="29" /></span>
    </button>
    <section class="atlas" [class.open]="ui.atlasOpen()" aria-label="Ask Atlas chat">
      <div class="atlas-head">
        <div class="atlas-orb"><app-icon name="bot" [size]="24" /></div>
        <div><h2>Ask Atlas</h2><div class="st"><i></i><span>Helping {{ persona.persona().role.toLowerCase() }} · online</span></div></div>
        <button class="min" (click)="ui.toggleAtlas()" aria-label="Minimize">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14"/></svg>
        </button>
      </div>
      <div class="atlas-body"><div class="msg bot" [innerHTML]="intro()"></div></div>
      <div class="chips">@for (c of chips(); track c) { <button class="chip" (click)="ask()">{{ c }}</button> }</div>
      <div class="atlas-input">
        <input #inp placeholder="Ask about your training..." aria-label="Ask Atlas" (keydown.enter)="ask()" />
        <button class="atlas-send" (click)="ask()"><app-icon name="send" [size]="19" /></button>
      </div>
      <div class="disclaim">Atlas is an AI assistant. Verify important details with your instructor.</div>
    </section>`,
})
export class AtlasFab {
  readonly ui = inject(UiService);
  readonly persona = inject(PersonaService);
  private toast = inject(ToastService);
  readonly intro = computed(() => INTRO[this.persona.current()]);
  readonly chips = computed(() => CHIPS[this.persona.current()]);

  ask(): void {
    this.toast.show('Ask Atlas — activation pending', 'The AI assistant is being finalized with L&D.');
  }
}
