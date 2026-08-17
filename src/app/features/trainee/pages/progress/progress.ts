import { Component } from '@angular/core';

interface StatCard {
  label: string;
  value: string;
}

interface Checkpoint {
  week: number;
  title: string;
  subtitle: string;
  score: string;
  status: string;
  statusClass: string;
  cardClass?: string;
}

interface ProgressItem {
  label: string;
  percentage: number;
  color: string;
}

interface RideAlong {
  title: string;
  mentor: string;
  result: string;
  status: string;
  statusClass: string;
  when: string;
}

@Component({
  selector: 'app-progress',
  standalone: true,
  templateUrl: './progress.html',
  styleUrl: './progress.scss',
})
export class Progress {
  readonly overallProgress = 50;

  readonly checkpointsPassed = 4;

  readonly averageScore = 88;

  readonly estimatedGraduation = 'Aug 29';

  readonly checkpoints: Checkpoint[] = [
    {
      week: 1,
      title: 'Ladder & Pole Aptitude',
      subtitle: 'Skills check · Jul 11',
      score: '92',
      status: 'Passed',
      statusClass: 'green',
      cardClass: 'pass',
    },
    {
      week: 2,
      title: 'Safety Competency Check',
      subtitle: 'Assessment · Jul 18',
      score: '88',
      status: 'Passed',
      statusClass: 'green',
      cardClass: 'pass',
    },
    {
      week: 3,
      title: 'Fiber Install I Checkpoint',
      subtitle: 'Skills check · Jul 25',
      score: '85',
      status: 'Passed',
      statusClass: 'green',
      cardClass: 'pass',
    },
    {
      week: 4,
      title: 'Fiber Install II Checkpoint',
      subtitle: 'Skills check · Aug 1',
      score: '90',
      status: 'Passed',
      statusClass: 'green',
      cardClass: 'pass',
    },
    {
      week: 5,
      title: 'Expert Path Install Checkpoint',
      subtitle: 'L1 feedback + RIDE obs · This week',
      score: '—',
      status: 'In progress',
      statusClass: 'blue',
      cardClass: 'pending',
    },
    {
      week: 6,
      title: 'Advanced Install Checkpoint',
      subtitle: 'L1 feedback + RIDE obs · Wk 6',
      score: '—',
      status: 'Locked',
      statusClass: 'grey',
    },
    {
      week: 7,
      title: 'Repair Troubleshooting Check',
      subtitle: 'Skills check · Wk 7',
      score: '—',
      status: 'Locked',
      statusClass: 'grey',
    },
    {
      week: 8,
      title: 'Final Competency Assessment',
      subtitle: 'Graduation gate · Wk 8',
      score: '—',
      status: 'Locked',
      statusClass: 'grey',
    },
  ];

  readonly progressBreakdown: ProgressItem[] = [
    {
      label: 'Self-paced courses',
      percentage: 50,
      color: '#00a8e0',
    },
    {
      label: 'Live training',
      percentage: 75,
      color: '#0568ae',
    },
    {
      label: 'Ride-alongs',
      percentage: 40,
      color: '#2ca01c',
    },
    {
      label: 'Competency checkpoints',
      percentage: 50,
      color: '#6e4b9e',
    },
  ];

  readonly rideAlongs: RideAlong[] = [
    {
      title: 'Drop bury & restoration',
      mentor: 'Mentor R. Castillo · Scored 4/5',
      result: 'Completed',
      status: 'green',
      statusClass: 'green',
      when: 'JUL 10',
    },
    {
      title: 'Premises wiring',
      mentor: 'Mentor R. Castillo · Scored 3/5',
      result: 'Completed',
      status: 'green',
      statusClass: 'green',
      when: 'JUL 9',
    },
    {
      title: 'Fiber drop & ONT',
      mentor: 'Mentor R. Castillo · Yard 4',
      result: 'Upcoming',
      status: 'amber',
      statusClass: 'amber',
      when: 'THU',
    },
  ];

  readonly certificationRequirements: string[] = [
    '✅ Modules 1–4 complete',
    '🔵 Modules 5–8 in progress',
    '🔵 Final assessment — Week 8',
  ];
}