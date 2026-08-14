import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyClimbService, MyClimbData } from './my-climb.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-climb',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-climb.html',
  styleUrls: ['./my-climb.scss'],
})
export class MyClimbComponent implements OnInit {
  currentWeek = 1;
  totalWeeks = 8;

  climberBottoms = 18;

  rungs: { week: number; bottom: number }[] = [];

  weeks = [
    { id: 8, title: 'Certification & Solo' },
    { id: 7, title: 'Expert Path Repair' },
    { id: 6, title: 'Expert Path Install II' },
    { id: 5, title: 'Expert Path Install I' },
    { id: 4, title: 'Fiber Installation II' },
    { id: 3, title: 'Fiber Installation I' },
    { id: 2, title: 'Safety Fundamentals' },
    { id: 1, title: 'Ladder & Pole Aptitude' },
  ];

  constructor(private climbService: MyClimbService) {}

  ngOnInit(): void {
    this.climbService.getMyClimb().subscribe((data: MyClimbData) => {
      this.totalWeeks = data.totalWeeks;

      this.rungs = Array.from({ length: this.totalWeeks }, (_, i) => ({
        week: i + 1,
        bottom: 18 + i * 47,
      }));

      // Start at Week 1
      this.currentWeek = data.currentWeek;
      this.climberBottoms = this.rungs[0].bottom;

      // Allow first render
      setTimeout(() => {
        const target = this.rungs.find((r) => r.week === data.currentWeek);

        if (target) {
          this.climberBottoms = target.bottom;
        }
      }, 100);
    });
  }

  get progressPercentage(): number {
    return Math.round((this.currentWeek / this.totalWeeks) * 100);
  }

  getRungBottom(weekId: number): number {
    const rung = this.rungs.find((r) => r.week === weekId);
    return rung ? rung.bottom - 12 : 0;
  }
}
