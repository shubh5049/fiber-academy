import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface MyClimbData {
  currentWeek: number;
  totalWeeks: number;
  // progressPercentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class MyClimbService {

  constructor() {}

  getMyClimb(): Observable<MyClimbData> {
    return of({
      currentWeek: 5,          // Change this value to test
      totalWeeks: 8,
      // progressPercentage: 0
    });
  }
}