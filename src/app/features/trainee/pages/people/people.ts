import { Component, OnDestroy, OnInit } from '@angular/core';

declare global {
  interface Window {
    openProfile?: (name: string) => void;
  }
}

@Component({
  selector: 'app-people',
  standalone: true,
  templateUrl: './people.html',
  styleUrl: './people.scss',
})
export class People implements OnInit, OnDestroy {
  ngOnInit(): void {
    window.openProfile = (name: string): void => {
      this.openProfile(name);
    };
  }

  ngOnDestroy(): void {
    delete window.openProfile;
  }

  openProfile(name: string): void {
    console.log(`Opening profile: ${name}`);

    // Replace with router navigation, dialog, drawer, or profile page later
    alert(`Opening profile: ${name}`);
  }
}