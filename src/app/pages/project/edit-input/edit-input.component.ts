import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-edit-input',
  templateUrl: './edit-input.component.html',
  styleUrls: ['./edit-input.component.scss'],
})
export class EditInputComponent {
  @Input() data: any;
  @Output() focusOut: EventEmitter<any> = new EventEmitter<any>();
  editMode = false;
  updatedData: any;

  @ViewChild('inputBox')
  inputBox!: ElementRef;

  constructor() {}

  ngOnInit() {
    this.updatedData = this.data;
  }

  onFocusOut() {
    console.log('focusout');
    
    this.focusOut.emit(this.data);
  }

  enableEdit() {
    this.editMode = true;
    this.editMode=true;
    setTimeout(() => {
      this.inputBox.nativeElement.focus();
    }, 1);
  }

  saveData($event: any) {
    $event.preventDefault();
    this.data = this.updatedData;
    this.editMode = false;
    console.log('this.data----', this.data);
  }
}
