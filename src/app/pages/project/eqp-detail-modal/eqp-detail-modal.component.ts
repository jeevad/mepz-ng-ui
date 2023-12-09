import { Component, Input, TemplateRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ModalDismissReasons,
  NgbActiveModal,
  NgbModal,
  NgbModule,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-eqp-detail-modal',
  standalone: true,
  imports: [CommonModule, NgbNavModule, NgbModule,],
  templateUrl: './eqp-detail-modal.component.html',
  styleUrls: ['./eqp-detail-modal.component.css'],
})
export class EqpDetailModalComponent {
  @Input() eqp: any;
  private modalService = inject(NgbModal);
  closeResult = '';
  activeTab = 1;

  constructor(public activeModal: NgbActiveModal) {}

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
