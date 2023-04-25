import { Component, AfterViewInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isLoggedIn$: Observable<boolean> = new BehaviorSubject<boolean>(true);

  blankUrl = '';
  currentUrl: string | undefined;
  checkoutUrls = ['/login','/'];
  constructor(private router: Router) {
    // router.events.subscribe((val) => {
    //   // see also 
    //   console.log(val instanceof NavigationEnd)
    // });
    // router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)  
    // ).subscribe((event: NavigationEnd) => {
    //   console.log(event.url);
    // });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        console.log('this.currentUrl',this.currentUrl);
        
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100)
      }


    });

    // router.events.pipe(filter(e => e instanceof NavigationEnd))

    //   // router.events.filter((e: any) => e instanceof NavigationEnd)
    //   .subscribe((e: NavigationEnd) => {
        
    //   });

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