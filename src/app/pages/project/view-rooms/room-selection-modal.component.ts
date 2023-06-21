import { Component, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-room-selection-modal',
  template: `

    <div class="modal-body">
      {{ errorMessage }}
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="closeModal()">OK</button>
    </div>
  `,
})
export class RoomSelectionModalComponent {
  @Input() errorMessage: string = '';

  constructor(public activeModal: NgbActiveModal) {}

  closeModal() {
    this.activeModal.close();
  }
}
