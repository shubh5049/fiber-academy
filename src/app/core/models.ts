/* ==========================================================================
   Domain models. Kept as plain interfaces so widgets stay decoupled from any
   concrete data source (mock today, API later).
   ========================================================================== */
export type PersonaKey =
  | 'trainee' | 'instructor' | 'mentor' | 'manager' | 'operations' | 'superuser' | 'admin';

export type ModuleStatus = 'done' | 'current' | 'locked';
export type TraineeStatus = 'active' | 'grad' | 'at-risk';
export type PillVariant = 'blue' | 'green' | 'amber' | 'grey' | 'red' | 'purple';

export interface Persona {
  key: PersonaKey;
  name: string;
  role: string;
  icon: string;
  color: string;
  desc: string;
}

export interface Module {
  id: number;
  wk: number;
  name: string;
  icon: string;
  yt: string;
  thumb: string;
  desc: string;
  done: boolean;
  date?: string;
  type: 'self' | 'assess';
}

export interface Trainee {
  id: string;
  name: string;
  cohort: string;
  wk: number;
  pr: number;
  status: TraineeStatus;
  mentor: string;
  mgr: string;
  att: number;
  score: number;
  you?: boolean;
  risk?: string;
  gradDate?: string;
}

export interface Cohort {
  name: string; start: string; size: number; instructor: string;
  avgPr: number; weeks: number; status: string;
}

export interface Checkpoint {
  wk: number; name: string; type: string;
  status: 'pass' | 'pending' | 'locked'; score: string; date: string;
}

export interface RideAlong {
  id: string; trainee: string; mentor: string; date: string; loc: string; task: string;
  status: 'completed' | 'upcoming' | 'scheduled'; score?: number; notes?: string;
}

export interface Profile {
  role: string;
  persona: PersonaKey | null;
  color: string;
  tenure: string;
  loc: string;
  email: string;
  bio: string;
  facts: string[];
  pic: string | null;
}

export interface NavItem { path: string; label: string; icon: string; }
export interface Notif { ic: string; c: string; t: string; s: string; w: string; }
export interface Integration { name: string; purpose: string; status: string; cls: string; note: string; }
export interface ReportDef { name: string; ic: string; desc: string; }

/** A KPI hero tile (gradient card + trend pill + sparkline). */
export interface KpiCard {
  cls: string;            // gradient class: kpi-purple | kpi-cyan | kpi-white | kpi-mint | kpi-amber | kpi-rose
  lbl: string;
  num: string | number;
  unit?: string;
  delta?: string;
  up?: boolean;
  fx?: string;
  ic: string;
  spark?: number[];
  sc?: string;            // sparkline stroke color
}

/** A "live row" list item (schedule, this-week, evaluations, etc.). */
export interface ListRow {
  icon: string;
  title: string;
  sub?: string;
  when?: string;
  pill?: { text: string; variant: PillVariant };
  iconBg?: string;
  iconColor?: string;
}
