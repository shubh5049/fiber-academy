import { Component, OnDestroy, OnInit } from '@angular/core';

interface CourseModule {
  id: number;
  week: number;
  title: string;
  description: string;
  duration: string;
  status: 'done' | 'available' | 'locked';
  dateText: string;
  imageUrl?: string;
}

declare global {
  interface Window {
    launchModule?: (moduleId: number) => void;
  }
}

@Component({
  selector: 'app-courses',
  standalone: true,
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
})
export class Courses implements OnInit, OnDestroy {
  modules: CourseModule[] = [
    {
      id: 1,
      week: 1,
      title: 'Ladder & Pole Aptitude',
      description:
        'Onboarding, PPE, ladders, poles and site safety fundamentals.',
      duration: '~12 min',
      status: 'done',
      dateText: 'Completed Jul 11',
      imageUrl:
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=640&q=70',
    },
    {
      id: 2,
      week: 2,
      title: 'Safety Fundamentals',
      description:
        'Standard-issue toolkit, meters, equipment handling and safety creed.',
      duration: '~12 min',
      status: 'done',
      dateText: 'Completed Jul 18',
      imageUrl:
        'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=640&q=70',
    },
    {
      id: 3,
      week: 3,
      title: 'Fiber Installation I',
      description:
        'Signal fundamentals, fiber vs copper, and network topology.',
      duration: '~12 min',
      status: 'done',
      dateText: 'Completed Jul 25',
      imageUrl:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=640&q=70',
    },
    {
      id: 4,
      week: 4,
      title: 'Fiber Installation II',
      description:
        'Hands-on terminations, connectors and splice preparation.',
      duration: '~12 min',
      status: 'done',
      dateText: 'Completed Aug 1',
      imageUrl:
        'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=640&q=70',
    },
    {
      id: 5,
      week: 5,
      title: 'Expert Path Install I',
      description:
        'Fiber drops, ONT activation and premises wiring walk-through.',
      duration: '~12 min',
      status: 'available',
      dateText: 'Available now',
    },
    {
      id: 6,
      week: 6,
      title: 'Expert Path Install II',
      description: 'Advanced and non-standard install scenarios.',
      duration: '~12 min',
      status: 'locked',
      dateText: 'Locked',
      imageUrl:
        'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=640&q=70',
    },
    {
      id: 7,
      week: 7,
      title: 'Expert Path Repair',
      description:
        'Field diagnostics, fault isolation and repair troubleshooting.',
      duration: '~12 min',
      status: 'locked',
      dateText: 'Locked',
      imageUrl:
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=640&q=70',
    },
    {
      id: 8,
      week: 8,
      title: 'Certification & Solo',
      description:
        'Final competency assessment, solo dispatch and sign-off.',
      duration: '~12 min',
      status: 'locked',
      dateText: 'Locked',
      imageUrl:
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=640&q=70',
    },
  ];

  ngOnInit(): void {
    window.launchModule = (moduleId: number): void => {
      this.launchModule(moduleId);
    };
  }

  ngOnDestroy(): void {
    delete window.launchModule;
  }

  launchModule(moduleId: number): void {
    const module = this.modules.find((m) => m.id === moduleId);

    if (!module) {
      return;
    }

    if (module.status === 'locked') {
      alert(`Module is locked: ${module.title}`);
      return;
    }

    if (module.status === 'done') {
      alert(`Rewatching: ${module.title}`);
      return;
    }

    alert(`Launching: ${module.title}`);
  }

  isCompleted(module: CourseModule): boolean {
    return module.status === 'done';
  }

  isLocked(module: CourseModule): boolean {
    return module.status === 'locked';
  }

  isAvailable(module: CourseModule): boolean {
    return module.status === 'available';
  }

  getCompletedCount(): number {
    return this.modules.filter((m) => m.status === 'done').length;
  }

  getProgressPercentage(): number {
    return Math.round((this.getCompletedCount() / this.modules.length) * 100);
  }
}