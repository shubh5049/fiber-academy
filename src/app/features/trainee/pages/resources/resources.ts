import { Component, OnDestroy, OnInit } from '@angular/core';

declare global {
  interface Window {
    toast?: (title: string, message?: string) => void;
  }
}

@Component({
  selector: 'app-resources',
  standalone: true,
  templateUrl: './resources.html',
  styleUrl: './resources.scss',
})
export class Resources implements OnInit, OnDestroy {
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
      return;
    }

    alert(title);
  }
}
