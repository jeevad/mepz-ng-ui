import { Component, OnDestroy } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from './toasts-container.component';
import { ToasterService } from './toaster.service';

@Component({
  standalone: true,
  imports: [NgbTooltipModule, ToastsContainer],
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
})
export class ToasterComponent implements OnDestroy {
  constructor(public toastService: ToasterService) {}

  showStandard() {
    this.toastService.show('I am a standard toast');
  }

  showSuccess() {
    this.toastService.show('I am a success toast', {
      classname: 'bg-success text-light',
      delay: 10000,
    });
  }

  showDanger(dangerTpl: any) {
    this.toastService.show(dangerTpl, {
      classname: 'bg-danger text-light',
      delay: 15000,
    });
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }
}

// @Component({
//   selector: 'ngbd-toast-global',
//   standalone: true,
//   imports: [NgbTooltipModule, ToastsContainer],
//   templateUrl: './toast-global.component.html',
// })
// export class NgbdToastGlobal{

// }
