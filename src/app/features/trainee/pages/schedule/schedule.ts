import { Component, OnDestroy, OnInit } from '@angular/core';

interface ScheduleItem {
  title: string;
  description: string;
  status: string;
  statusClass: string;
  when: string;
}

declare global {
  interface Window {
    toast?: (title: string, message?: string) => void;
  }
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  templateUrl: './schedule.html',
  styleUrl: './schedule.scss',
})
export class Schedule implements OnInit, OnDestroy {
  readonly liveTrainingSessions: ScheduleItem[] = [
    {
      title: 'Expert Path Install — Live Q&A',
      description: 'Instructor: T. Nguyen · Virtual (link sent)',
      status: 'Upcoming',
      statusClass: 'blue',
      when: 'TUE 9:00a',
    },
    {
      title: 'Splicing Lab Review',
      description: 'Instructor: T. Nguyen · Training Center B',
      status: 'Upcoming',
      statusClass: 'blue',
      when: 'FRI 1:00p',
    },
    {
      title: 'Fiber Basics Recap',
      description: 'Instructor: A. Park · Recorded',
      status: 'Completed',
      statusClass: 'green',
      when: '— done',
    },
  ];

  readonly rideAlongs: ScheduleItem[] = [
    {
      title: 'Field Install w/ Mentor R. Castillo',
      description: 'Yard 4 · Fiber drop & ONT activation · Bring harness',
      status: 'In 1 day',
      statusClass: 'amber',
      when: 'THU 7:30a',
    },
    {
      title: 'Service Call Shadowing',
      description: 'Mentor: L. Owens · Meet dispatch',
      status: 'Scheduled',
      statusClass: 'grey',
      when: 'NEXT WK',
    },
    {
      title: 'Drop Bury & Restoration',
      description: 'Mentor: R. Castillo · Scored 4/5',
      status: 'Completed',
      statusClass: 'green',
      when: '— done',
    },
  ];

  ngOnInit(): void {
    window.toast = (title: string, message?: string): void => {
      this.toast(title, message);
    };
  }

  ngOnDestroy(): void {
    delete window.toast;
  }

  toast(title: string, message?: string): void {
    console.log(title, message);

    if (message) {
      alert(`${title}\n${message}`);
    } else {
      alert(title);
    }
  }
}