import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MODULES } from '../../../../core/mock-data';

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

@Injectable({
  providedIn: 'root'
})
export class MyClimbService {

  getMyClimb(): Observable<MyClimbData> {

    const weeks: WeekData[] = [...MODULES]
      .sort((a, b) => b.wk - a.wk)
      .map(module => ({
        id: module.wk,
        title: module.name,
        completed: module.done
      }));

    const orderedModules = [...MODULES].sort(
      (a, b) => a.wk - b.wk
    );

    const currentWeek =
      orderedModules.find(m => !m.done)?.wk ??
      orderedModules.length;

    return of({
      currentWeek,
      totalWeeks: orderedModules.length,
      weeks
    });
  }
}