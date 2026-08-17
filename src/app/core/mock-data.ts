/* ==========================================================================
   Mock data — the single place to swap for real APIs later. Everything the
   services expose is derived from here.
   ========================================================================== */
import {
  Persona, Profile, Module, Trainee, Cohort, Checkpoint, RideAlong,
  Notif, Integration, ReportDef, NavItem, PersonaKey,
} from './models';

/** Color-neutral, genderless avatar used for every user (embedded SVG). */
export const NEUTRAL_AVATAR =
  'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
    '<rect width="100" height="100" fill="#E7E9ED"/>' +
    '<path d="M18 100 V86 C18 71 33 63 50 63 C67 63 82 71 82 86 V100 Z" fill="#9AA5B1"/>' +
    '<circle cx="50" cy="44" r="19" fill="#9AA5B1"/></svg>');

const AVC = ['#00A8E0', '#2ca01c', '#0568ae', '#6e4b9e', '#e0a015', '#5d7783', '#0b7a8c', '#d64545', '#00838f', '#7b5ea7'];
export function initials(n: string): string {
  return n.replace(/\(You\)/, '').trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}
export function avatarColor(id: string): string {
  let h = 0; for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0; return AVC[h % AVC.length];
}

export const PERSONAS: Persona[] = [
  { key: 'trainee',    name: 'Dane Johnson', role: 'Trainee',       icon: 'user',         color: '#00A8E0', desc: 'New technician — Cohort July-07' },
  { key: 'instructor', name: 'Tomás Nguyen', role: 'Instructor',    icon: 'presentation', color: '#0568ae', desc: 'Leads live training · 2 cohorts' },
  { key: 'mentor',     name: 'Rob Castillo', role: 'Mentor',        icon: 'car',          color: '#2ca01c', desc: 'Field mentor · ride-alongs' },
  { key: 'manager',    name: 'Denise Park',  role: 'Manager',       icon: 'chart',        color: '#6e4b9e', desc: 'Oversees 14 trainees' },
  { key: 'operations', name: 'Sana Malik',   role: 'Operations',    icon: 'gear',         color: '#0b7a8c', desc: 'Program operations & enrollment' },
  { key: 'superuser',  name: 'Q. Green',     role: 'Super User',    icon: 'layers',       color: '#0f2f4a', desc: 'Client / program oversight' },
  { key: 'admin',      name: 'Sys Admin',    role: 'Administrator', icon: 'shield',       color: '#37475a', desc: 'System configuration & users' },
];

export const MODULES: Module[] = [
  { id: 1, wk: 1, name: 'Ladder & Pole Aptitude', icon: 'self',   yt: 'd0bSDcvU-iU', thumb: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=640&q=70', desc: 'Onboarding, PPE, ladders, poles and site safety fundamentals.', done: true, date: 'Jul 11', type: 'self' },
  { id: 2, wk: 2, name: 'Safety Fundamentals',    icon: 'shield', yt: '3JZ_D3ELwOQ', thumb: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=640&q=70', desc: 'Standard-issue toolkit, meters, equipment handling and safety creed.', done: true, date: 'Jul 18', type: 'self' },
  { id: 3, wk: 3, name: 'Fiber Installation I',   icon: 'cable',  yt: 'qiQR5rTSshw', thumb: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=640&q=70', desc: 'Signal fundamentals, fiber vs copper, and network topology.', done: true, date: 'Jul 25', type: 'self' },
  { id: 4, wk: 4, name: 'Fiber Installation II',  icon: 'splice', yt: 'hpcb5rpAYUg', thumb: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=640&q=70', desc: 'Hands-on terminations, connectors and splice preparation.', done: true, date: 'Aug 1', type: 'self' },
  { id: 5, wk: 5, name: 'Expert Path Install I',  icon: 'install', yt: '1Xnk1bU3sQk', thumb: 'https://images.unsplash.com/photo-1597766353939-3c52f74f5a83?auto=format&fit=crop&w=640&q=70', desc: 'Fiber drops, ONT activation and premises wiring walk-through.', done: false, type: 'self' },
  { id: 6, wk: 6, name: 'Expert Path Install II', icon: 'install', yt: 'Q2tMpHvqLDE', thumb: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=640&q=70', desc: 'Advanced and non-standard install scenarios.', done: false, type: 'self' },
  { id: 7, wk: 7, name: 'Expert Path Repair',     icon: 'diag',   yt: 'lkIFF4maKMU', thumb: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=640&q=70', desc: 'Field diagnostics, fault isolation and repair troubleshooting.', done: false, type: 'self' },
  { id: 8, wk: 8, name: 'Certification & Solo',   icon: 'cert',   yt: '5MgBikgcWnY', thumb: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=640&q=70', desc: 'Final competency assessment, solo dispatch and sign-off.', done: false, type: 'assess' },
];

export interface WeekData {
  id: number;
  title: string;
  completed: boolean;
}

export interface MyClimbData {
  currentWeek: number;
  totalWeeks: number;
  weeks: WeekData[];
}

/**
 * Dynamic mock API response derived from MODULES.
 * Works exactly like a backend contract.
 */
export function buildMyClimbApi(): MyClimbData {
  const orderedModules = [...MODULES].sort(
    (a, b) => a.wk - b.wk
  );

  const currentWeek =
    orderedModules.find(m => !m.done)?.wk ??
    orderedModules.length;

  return {
    currentWeek,
    totalWeeks: orderedModules.length,
    weeks: [...MODULES]
      .sort((a, b) => b.wk - a.wk)
      .map(module => ({
        id: module.wk,
        title: module.name,
        completed: module.done
      }))
  };
}

export const TRAINEES: Trainee[] = [
  { id: 't1', name: 'Dane Johnson', cohort: 'July-07', wk: 5, pr: 62, status: 'active', mentor: 'Rob Castillo', mgr: 'Denise Park', att: 96, score: 88, you: true },
  { id: 't2', name: 'Maria Jimenez', cohort: 'July-07', wk: 6, pr: 75, status: 'active', mentor: 'Lena Owens', mgr: 'Denise Park', att: 100, score: 93 },
  { id: 't3', name: 'Rob Kessler', cohort: 'July-07', wk: 5, pr: 62, status: 'active', mentor: 'Rob Castillo', mgr: 'Denise Park', att: 88, score: 79 },
  { id: 't4', name: 'Tanya Brooks', cohort: 'July-07', wk: 4, pr: 50, status: 'at-risk', mentor: 'Rob Castillo', mgr: 'Denise Park', att: 64, score: 58, risk: 'Attendance below 70% · missed 2 ride-alongs' },
  { id: 't5', name: 'Kevin Oduya', cohort: 'July-07', wk: 7, pr: 88, status: 'active', mentor: 'Lena Owens', mgr: 'Denise Park', att: 100, score: 96 },
  { id: 't6', name: 'Sam Lin', cohort: 'July-07', wk: 5, pr: 62, status: 'active', mentor: 'Rob Castillo', mgr: 'Denise Park', att: 92, score: 84 },
  { id: 't7', name: 'Priya Nair', cohort: 'July-07', wk: 6, pr: 75, status: 'active', mentor: 'Lena Owens', mgr: 'Denise Park', att: 96, score: 90 },
  { id: 't8', name: 'Drew Walsh', cohort: 'July-07', wk: 3, pr: 38, status: 'at-risk', mentor: 'Rob Castillo', mgr: 'Denise Park', att: 72, score: 61, risk: 'Behind pace · Week 3 at Week 5 checkpoint' },
  { id: 't9', name: 'Alicia Gomez', cohort: 'July-07', wk: 5, pr: 62, status: 'active', mentor: 'Lena Owens', mgr: 'Denise Park', att: 100, score: 87 },
  { id: 't10', name: 'Marcus Webb', cohort: 'July-07', wk: 6, pr: 75, status: 'active', mentor: 'Rob Castillo', mgr: 'Denise Park', att: 88, score: 82 },
  { id: 't11', name: 'Jenna Osei', cohort: 'July-07', wk: 5, pr: 62, status: 'active', mentor: 'Lena Owens', mgr: 'Denise Park', att: 96, score: 85 },
  { id: 't12', name: 'Tyrese Bell', cohort: 'July-07', wk: 4, pr: 50, status: 'active', mentor: 'Rob Castillo', mgr: 'Denise Park', att: 80, score: 74 },
  { id: 't13', name: 'Nadia Farouk', cohort: 'June-23', wk: 8, pr: 100, status: 'active', mentor: 'Lena Owens', mgr: 'Carl Reyes', att: 100, score: 94 },
  { id: 't14', name: 'Owen Pratt', cohort: 'June-23', wk: 8, pr: 100, status: 'active', mentor: 'Rob Castillo', mgr: 'Carl Reyes', att: 96, score: 91 },
  { id: 'g1', name: 'Hannah Cole', cohort: 'May-12', wk: 8, pr: 100, status: 'grad', mentor: 'Lena Owens', mgr: 'Denise Park', att: 98, score: 95, gradDate: 'Jul 7, 2026' },
  { id: 'g2', name: 'Leo Martins', cohort: 'May-12', wk: 8, pr: 100, status: 'grad', mentor: 'Rob Castillo', mgr: 'Denise Park', att: 94, score: 89, gradDate: 'Jul 7, 2026' },
  { id: 'g3', name: 'Fatima Zahra', cohort: 'May-12', wk: 8, pr: 100, status: 'grad', mentor: 'Lena Owens', mgr: 'Denise Park', att: 100, score: 97, gradDate: 'Jul 7, 2026' },
];

export const COHORTS: Cohort[] = [
  { name: 'July-07', start: 'Jul 7, 2026', size: 12, instructor: 'Tomás Nguyen', avgPr: 62, weeks: 5, status: 'active' },
  { name: 'June-23', start: 'Jun 23, 2026', size: 10, instructor: 'Tomás Nguyen', avgPr: 100, weeks: 8, status: 'active' },
  { name: 'May-12', start: 'May 12, 2026', size: 11, instructor: 'Aisha Park', avgPr: 100, weeks: 8, status: 'graduated' },
];

export const CHECKPOINTS: Checkpoint[] = [
  { wk: 1, name: 'Ladder & Pole Aptitude', type: 'Skills check', status: 'pass', score: '92', date: 'Jul 11' },
  { wk: 2, name: 'Safety Competency Check', type: 'Assessment', status: 'pass', score: '88', date: 'Jul 18' },
  { wk: 3, name: 'Fiber Install I Checkpoint', type: 'Skills check', status: 'pass', score: '85', date: 'Jul 25' },
  { wk: 4, name: 'Fiber Install II Checkpoint', type: 'Skills check', status: 'pass', score: '90', date: 'Aug 1' },
  { wk: 5, name: 'Expert Path Install Checkpoint', type: 'L1 feedback + RIDE obs', status: 'pending', score: '—', date: 'This week' },
  { wk: 6, name: 'Advanced Install Checkpoint', type: 'L1 feedback + RIDE obs', status: 'locked', score: '—', date: 'Wk 6' },
  { wk: 7, name: 'Repair Troubleshooting Check', type: 'Skills check', status: 'locked', score: '—', date: 'Wk 7' },
  { wk: 8, name: 'Final Competency Assessment', type: 'Graduation gate', status: 'locked', score: '—', date: 'Wk 8' },
];

export const RIDEALONGS: RideAlong[] = [
  { id: 'r1', trainee: 'Dane Johnson', mentor: 'Rob Castillo', date: 'Thu Jul 17 · 7:30a', loc: 'Yard 4', task: 'Fiber drop & ONT activation', status: 'upcoming' },
  { id: 'r2', trainee: 'Dane Johnson', mentor: 'Rob Castillo', date: 'Jul 10 · 8:00a', loc: 'Dispatch', task: 'Drop bury & restoration', status: 'completed', score: 4, notes: 'Strong on safety setup. Needs practice on connector polish.' },
  { id: 'r3', trainee: 'Sam Lin', mentor: 'Rob Castillo', date: 'Fri Jul 18 · 8:00a', loc: 'Yard 4', task: 'Service call shadowing', status: 'scheduled' },
  { id: 'r4', trainee: 'Tanya Brooks', mentor: 'Rob Castillo', date: 'Mon Jul 21 · 7:30a', loc: 'Yard 2', task: 'Fiber drop install', status: 'scheduled' },
  { id: 'r5', trainee: 'Rob Kessler', mentor: 'Rob Castillo', date: 'Jul 9 · 7:30a', loc: 'Yard 4', task: 'Premises wiring', status: 'completed', score: 3, notes: 'Good progress. Review ONT light-status troubleshooting.' },
  { id: 'r6', trainee: 'Marcus Webb', mentor: 'Rob Castillo', date: 'Wed Jul 23 · 8:00a', loc: 'Dispatch', task: 'Repair troubleshooting', status: 'scheduled' },
];

const BASE_PROFILES: Record<string, Profile> = {
  'Dane Johnson': { role: 'Trainee', persona: 'trainee', color: '#00A8E0', tenure: 'New hire · started Jul 2026', loc: 'Premises South · Dallas, TX', email: 'dane.johnson@att.com', bio: 'Career-changer from residential electrical. Loves a clean cable run and getting a customer online on the first try.', facts: ['Ran a 10K last spring', 'Makes the best brisket in the cohort', 'Learning Spanish on the drive in'], pic: null },
  'Tomás Nguyen': { role: 'Instructor', persona: 'instructor', color: '#0568ae', tenure: '12 years at AT&T', loc: 'Training Center B · Dallas, TX', email: 'tomas.nguyen@att.com', bio: 'Field tech turned instructor. Believes the fundamentals — ladders, safety, and clean terminations — carry the whole career.', facts: ['Certified splicing trainer', 'Coaches little-league on weekends', 'Has trained 400+ techs'], pic: null },
  'Rob Castillo': { role: 'Mentor', persona: 'mentor', color: '#2ca01c', tenure: '9 years in the field', loc: 'Yard 4 · Fort Worth, TX', email: 'rob.castillo@att.com', bio: 'Master technician and ride-along mentor. Big on safety-first and letting trainees make the call under a watchful eye.', facts: ['Restores old trucks', 'Never failed a safety audit', 'Bring coffee to the 7:30a rides'], pic: null },
  'Denise Park': { role: 'Manager', persona: 'manager', color: '#6e4b9e', tenure: '15 years · Regional L&D', loc: 'Premises South', email: 'denise.park@att.com', bio: 'Regional learning & development manager. Cares most about new hires feeling supported through those first tough weeks.', facts: ['Started as a tech herself', 'Marathoner', 'Mentors first-gen grads'], pic: null },
  'Sana Malik': { role: 'Operations', persona: 'operations', color: '#0b7a8c', tenure: '6 years · Workforce Mgmt', loc: 'Operations Center', email: 'sana.malik@att.com', bio: 'Keeps the program running — enrollment, cohorts, mentor assignments, and scheduling all flow through her.', facts: ['Spreadsheet wizard', 'Plans the team potlucks', 'Two rescue dogs'], pic: null },
  'Q. Green': { role: 'Super User', persona: 'superuser', color: '#0f2f4a', tenure: 'Program sponsor · L&D', loc: 'AT&T Future Fiber', email: 'q.green@att.com', bio: "Shepherds the Future Fiber training program on the client side. Wants an experience that's engaging, not dry and corporate.", facts: ['Champion of the TikTok-gen learner', 'Obsessed with clean dashboards', 'Ask me about the roadmap'], pic: null },
  'Sys Admin': { role: 'Administrator', persona: 'admin', color: '#37475a', tenure: 'Platform team', loc: 'System', email: 'admin@att.com', bio: 'Configures the portal — courses, roles, integrations, and audit control.', facts: ['Automates everything', 'Guards the audit log'], pic: null },
  'Lena Owens': { role: 'Mentor', persona: null, color: '#00838f', tenure: '7 years in the field', loc: 'Yard 2 · Arlington, TX', email: 'lena.owens@att.com', bio: 'Field mentor focused on customer-facing service calls and troubleshooting.', facts: ['Patient teacher', 'Former help-desk lead'], pic: null },
  'Carl Reyes': { role: 'Manager', persona: null, color: '#7b5ea7', tenure: '11 years', loc: 'Premises North', email: 'carl.reyes@att.com', bio: "Manages the June cohort's new hires.", facts: ['Cyclist', 'Coffee snob'], pic: null },
  'Aisha Park': { role: 'Instructor', persona: null, color: '#0568ae', tenure: '8 years', loc: 'Training Center A', email: 'aisha.park@att.com', bio: 'Instructor for the graduated May cohort.', facts: ['Loves a good analogy'], pic: null },
};

/** Build the full profile map: explicit profiles + a lightweight one per trainee,
    then assign the neutral avatar to everyone. */
export function buildProfiles(): Record<string, Profile> {
  const blurbs = ['Detail-oriented and always early to the yard.', 'Came from retail — great with customers.', 'Quiet, but tops the skills checks.', 'Team clown; keeps morale high on long days.', 'Ex-military; safety is second nature.', 'Asks the best questions in class.', 'Hands-on learner who loves the field weeks.', 'Determined to certify ahead of schedule.'];
  const factsPool = [['Plays guitar', 'Weekend hiker'], ['Two kids', 'Fantasy football commissioner'], ['Learning to weld', 'Dog person'], ['Runs 5Ks', 'Amateur photographer'], ['Gamer', 'Volunteers at a food bank'], ['Foodie', 'Trail runner'], ['Cyclist', 'Podcast addict'], ['Gardener', 'Chess club']];
  const map: Record<string, Profile> = { ...BASE_PROFILES };
  TRAINEES.forEach((t, i) => {
    if (!map[t.name]) {
      map[t.name] = {
        role: 'Trainee', persona: null, color: avatarColor(t.id), tenure: 'New hire · ' + t.cohort,
        loc: 'Premises South', email: t.name.toLowerCase().replace(/[^a-z]+/g, '.') + '@att.com',
        bio: blurbs[i % blurbs.length], facts: factsPool[i % factsPool.length], pic: null,
      };
    }
  });
  for (const name of Object.keys(map)) map[name] = { ...map[name], pic: NEUTRAL_AVATAR };
  return map;
}

export const NOTIFS: Record<PersonaKey, Notif[]> = {
  trainee: [
    { ic: 'car', c: '#2ca01c', t: 'Ride-along tomorrow', s: 'Fiber drop & ONT with R. Castillo · Yard 4', w: '7:30a THU' },
    { ic: 'install', c: '#00A8E0', t: 'Week 5 module available', s: 'Expert Path Install I is now unlocked', w: '2h ago' },
    { ic: 'cal', c: '#0568ae', t: 'Live Q&A scheduled', s: 'Expert Path Install — Tue 9:00a', w: 'Yesterday' },
  ],
  instructor: [
    { ic: 'alert', c: '#d64545', t: '2 trainees flagged at-risk', s: 'Tanya Brooks, Drew Walsh — review needed', w: '1h ago' },
    { ic: 'clipboard', c: '#0568ae', t: 'Week 5 checkpoints due', s: '9 Expert Path evaluations pending entry', w: 'Today' },
    { ic: 'cal', c: '#00A8E0', t: 'Session starts soon', s: 'Splicing Lab Review · Fri 1:00p · Center B', w: 'Fri' },
  ],
  mentor: [
    { ic: 'car', c: '#2ca01c', t: 'Ride-along tomorrow', s: 'Dane Johnson · Yard 4 · 7:30a', w: 'THU' },
    { ic: 'clipboard', c: '#e0a015', t: 'Evaluation form due', s: 'Submit eval for R. Kessler (Jul 9 ride-along)', w: 'Overdue' },
    { ic: 'cal', c: '#00A8E0', t: '3 ride-alongs this week', s: 'Sam Lin, Tanya Brooks, Marcus Webb', w: 'This wk' },
  ],
  manager: [
    { ic: 'alert', c: '#d64545', t: 'Trainee off-track alert', s: 'Drew Walsh behind pace at Week 5 gate', w: '2h ago' },
    { ic: 'chart', c: '#6e4b9e', t: 'Weekly report ready', s: 'July-07 cohort performance summary', w: 'Mon' },
    { ic: 'cap', c: '#2ca01c', t: '3 graduations logged', s: 'May-12 cohort moved to archive', w: 'Jul 7' },
  ],
  operations: [
    { ic: 'user', c: '#0b7a8c', t: '5 enrollments pending', s: 'New hires awaiting cohort assignment', w: 'Today' },
    { ic: 'car', c: '#e0a015', t: 'Mentor gap detected', s: 'August-04 cohort has 2 unassigned trainees', w: '1h ago' },
    { ic: 'cal', c: '#00A8E0', t: 'Ride-along conflict', s: 'Yard 4 double-booked Thu 7:30a', w: '30m ago' },
  ],
  superuser: [
    { ic: 'chart', c: '#0f2f4a', t: 'Program KPIs updated', s: 'On-time graduation at 91% this quarter', w: 'Today' },
    { ic: 'survey', c: '#0568ae', t: 'Survey results in', s: 'July-07 mid-program NPS: +58', w: 'Yesterday' },
  ],
  admin: [
    { ic: 'link', c: '#37475a', t: 'Integration health check', s: 'Award Learning System API — all green', w: '1h ago' },
    { ic: 'shield', c: '#d64545', t: 'Permission change logged', s: 'Super User role scope updated by S. Malik', w: 'Today' },
  ],
};

export const INTEGRATIONS: Integration[] = [
  { name: 'AT&T Identity Management', purpose: 'SSO / login authentication', status: 'Connected', cls: 'green', note: 'MOTS ID' },
  { name: 'Award Learning System', purpose: 'Self-paced content, progress & completion', status: 'Connected', cls: 'green', note: 'APIs + Deeplinks' },
  { name: 'Learning Platform (PLE)', purpose: 'Instructor-led content & sessions', status: 'Pending', cls: 'amber', note: 'APIs under review' },
  { name: 'Cornerstone (CSOD)', purpose: 'Long-term LMS (2027 migration)', status: 'Planned', cls: 'grey', note: 'Migration target' },
  { name: 'Ask Atlas', purpose: 'AT&T AI assistant for learner support', status: 'Investigating', cls: 'amber', note: 'Activation TBD' },
  { name: 'Azure Hosting', purpose: 'Platform / hosting environment', status: 'Deferred', cls: 'grey', note: 'Technical workshop' },
];

export const REPORTS: ReportDef[] = [
  { name: 'Attendance Tracking', ic: 'clipboard', desc: 'Session & ride-along attendance by trainee, cohort, and week.' },
  { name: 'Cohort Performance', ic: 'chart', desc: 'Average progress, scores, and pace across active cohorts.' },
  { name: 'Graduation Tracking', ic: 'cap', desc: 'On-time graduation rates and completion forecasting.' },
  { name: 'Competency Assessments', ic: 'gauge', desc: 'Weekly checkpoint pass rates and final assessment outcomes.' },
  { name: 'Survey Results', ic: 'survey', desc: 'Mid-program and post-program learner feedback / NPS.' },
  { name: 'Learner Scorecards', ic: 'user', desc: 'Individual scorecard rollups for manager & instructor review.' },
];

/** Persona navigation — Angular route paths. */
export const NAV: Record<PersonaKey, NavItem[]> = {
  trainee: [
    { path: '/trainee/dashboard', label: 'Dashboard', icon: 'grid' },
    { path: '/trainee/my-climb', label: 'My Climb', icon: 'trendup' },
    {path: '/trainee/courses', label: 'Courses', icon: 'book'},
    { path: '/trainee/schedule', label: 'Schedule', icon: 'cal' },
    { path: '/trainee/progress', label: 'Progress & Certification', icon: 'award' },
    { path: '/trainee/people', label: 'People', icon: 'people' },
    { path: '/trainee/resources', label: 'Resources', icon: 'folder' },
  ],
  instructor: [
    { path: '/instructor/dashboard', label: 'Dashboard', icon: 'grid' },
    { path: '/instructor/cohorts', label: 'My Cohorts', icon: 'people' },
    { path: '/instructor/attendance', label: 'Attendance', icon: 'clipcheck' },
    { path: '/instructor/assessments', label: 'Assessments', icon: 'gauge' },
    { path: '/instructor/sessions', label: 'Live Sessions', icon: 'video' },
    { path: '/instructor/reports', label: 'Reports', icon: 'chart' },
  ],
  mentor: [
    { path: '/mentor/dashboard', label: 'Dashboard', icon: 'grid' },
    { path: '/mentor/trainees', label: 'My Trainees', icon: 'people' },
    { path: '/mentor/ride-alongs', label: 'Ride-Alongs', icon: 'car' },
    { path: '/mentor/evaluations', label: 'Evaluations', icon: 'clipboard' },
  ],
  manager: [
    { path: '/manager/dashboard', label: 'Dashboard', icon: 'grid' },
    { path: '/manager/team', label: 'My Team', icon: 'people' },
    { path: '/manager/reports', label: 'Reports', icon: 'chart' },
    { path: '/manager/graduated', label: 'Graduated', icon: 'cap' },
  ],
  operations: [
    { path: '/operations/dashboard', label: 'Dashboard', icon: 'grid' },
    { path: '/operations/enrollment', label: 'Enrollment', icon: 'userplus' },
    { path: '/operations/cohorts', label: 'Cohorts', icon: 'people' },
    { path: '/operations/mentors', label: 'Mentor Assignment', icon: 'usercheck' },
    { path: '/operations/scheduling', label: 'Ride-Along Scheduling', icon: 'cal' },
    { path: '/operations/records', label: 'Records & Overrides', icon: 'edit' },
    { path: '/operations/users', label: 'User Management', icon: 'idcard' },
  ],
  superuser: [
    { path: '/superuser/overview', label: 'Program Overview', icon: 'layers' },
    { path: '/superuser/reports', label: 'Program Reports', icon: 'chart' },
    { path: '/superuser/cohorts', label: 'All Cohorts', icon: 'people' },
    { path: '/superuser/view-as', label: 'View As…', icon: 'eye' },
  ],
  admin: [
    { path: '/admin/dashboard', label: 'Dashboard', icon: 'grid' },
    { path: '/admin/catalog', label: 'Course Catalog', icon: 'book' },
    { path: '/admin/sequence', label: 'Course Sequence', icon: 'route' },
    { path: '/admin/roles', label: 'Roles & Permissions', icon: 'shield' },
    { path: '/admin/users', label: 'Users', icon: 'people' },
    { path: '/admin/integrations', label: 'Integrations', icon: 'plug' },
    { path: '/admin/forms', label: 'Form Builder', icon: 'clipboard' },
    { path: '/admin/reporting', label: 'Reporting Config', icon: 'sliders' },
    { path: '/admin/notifications', label: 'Notifications', icon: 'bell' },
    { path: '/admin/logs', label: 'Audit Logs', icon: 'clock' },
  ],
};
