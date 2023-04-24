import { Component,AfterViewInit} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'app';
  isLoggedIn$: Observable<boolean> = new BehaviorSubject<boolean>(true);
}
