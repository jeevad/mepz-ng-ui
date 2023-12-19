import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormArray,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.css'],
})
export class FilterModalComponent {
  private modalService = inject(NgbModal);
  closeResult = '';
  // activeTab = 1;

  form = this.fb.group({
    filters: this.fb.array([
      // {
      //   department: ['', Validators.required],
      //   room: ['', Validators.required],
      //   equipment: ['', Validators.required],
      // },
    ]),
  });

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {
    for (let i = 0; i < 5; i++) {
      this.addFilter();
    }
  }

  get filters() {
    return this.form.controls['filters'] as FormArray;
  }

  addFilter() {
    const filterForm = this.fb.group({
      department: ['', Validators.required],
      room: ['', Validators.required],
      equipment: ['', Validators.required],
    });

    this.filters.push(filterForm);
  }

  onSubmit() {
    console.log(this.form.value);
    this.activeModal.close(this.form.value);
  }

}
