import { Component, AfterViewInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  isLoggedIn$: Observable<boolean> = new BehaviorSubject<boolean>(true);

  blankUrl = '';
  currentUrl: string | undefined;
  checkoutUrls = ['/login', '/'];
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
      }

      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        console.log('this.currentUrl', this.currentUrl);

        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      }
    });
  }
  isCheckoutRoute() {
    if (!this.currentUrl) {
      return false;
    }
    const index = this.checkoutUrls.indexOf(this.currentUrl);
    if (index >= 0) {
      return true;
    } else {
      return false;
    }
  }
}
