import { Component, OnDestroy } from '@angular/core';
import { ToasterService } from '../toaster/toaster.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(public toastService: ToasterService) {}

  ngOnInit() {
    this.showStandard();
    this.showSuccess();
    this.showDanger();
  }

  showStandard() {
    this.toastService.show('I am a standard toast');
  }

  showSuccess() {
    this.toastService.show('I am a success toast', {
      classname: 'bg-success text-light',
      delay: 10000,
    });
  }

  showDanger() {
    this.toastService.show('I am a error toast', {
      classname: 'bg-danger text-light',
      delay: 15000,
    });
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }
}
