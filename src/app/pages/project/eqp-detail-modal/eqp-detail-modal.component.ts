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
  imports: [CommonModule, NgbNavModule, NgbModule],
  templateUrl: './eqp-detail-modal.component.html',
  styleUrls: ['./eqp-detail-modal.component.css'],
})
export class EqpDetailModalComponent {
  @Input() eqp: any;
  private modalService = inject(NgbModal);
  closeResult = '';
  activeTab = 1;

  constructor(public activeModal: NgbActiveModal) {}
}
