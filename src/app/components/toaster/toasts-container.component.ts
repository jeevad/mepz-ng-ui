import { Component, TemplateRef } from '@angular/core';

import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from './toaster.service';

@Component({
  selector: 'app-toasts',
  standalone: true,
  imports: [NgbToastModule, NgIf, NgTemplateOutlet, NgFor],
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)"
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <!-- <ng-template #text
        >{{ toast.textOrTpl }}<button
          type="button"
          aria-label="Close"
          class="btn-close"
          (click)="remove(toast)"
        ></button>
      </ng-template> -->
      <ng-template #text>
        <div class="d-sm-flex align-items-center justify-content-between">
          <span>{{ toast.textOrTpl }}</span>
          <button
            type="button"
            aria-label="Close"
            class="btn-close"
            style="color: #000;"
            (click)="remove(toast)"
          ></button>
        </div>
      </ng-template>
    </ngb-toast>
  `,
  host: {
    class: 'toast-container position-fixed top-0 end-0 p-3',
    style: 'z-index: 1200',
  },
})
export class ToastsContainer {
  constructor(public toastService: ToasterService) {}

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }

  reset() {}

  remove(toast: any) {
    this.toastService.toasts = this.toastService.toasts.filter(
      (t) => t !== toast
    );
  }
}
