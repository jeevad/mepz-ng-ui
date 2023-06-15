import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatInput } from '@angular/material/input';
// import { ViewModeDirective } from './view-mode.directive';
// import { EditModeDirective } from './edit-mode.directive';
// import { NgControl } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { switchMap, filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-input',
  templateUrl: './edit-input.component.html',
  styleUrls: ['./edit-input.component.scss'],
})
export class EditInputComponent {
  @Input() data: any;
  // @Output() focusOut: EventEmitter<any> = new EventEmitter<any>();
  updatedData: any;

  // @ContentChild(ViewModeDirective) viewModeTpl!: ViewModeDirective;
  // @ContentChild(EditModeDirective) editModeTpl!: EditModeDirective;
  @Output() update = new EventEmitter();

  editMode = new Subject();
  editMode$ = this.editMode.asObservable();

  mode: 'view' | 'edit' = 'view';

  @ViewChild('inputBox')
  inputBox!: ElementRef;

  constructor(private host: ElementRef) {}

  // onFocusOut() {
  //   this.focusOut.emit(this.data);
  // }

  // enableEdit() {
  //   setTimeout(() => {
  //     this.inputBox.nativeElement.focus();
  //   }, 1);
  // }

  ngOnInit() {
    this.updatedData = this.data;
    this.viewModeHandler();
    this.editModeHandler();
  }

  toViewMode() {
    this.update.next('tt');
    this.mode = 'view';
  }

  private get element() {
    return this.host.nativeElement;
  }

  private viewModeHandler() {
    fromEvent(this.element, 'dblclick')
      .pipe
      // untilDestroyed(this)
      ()
      .subscribe(() => {
        this.mode = 'edit';
        this.editMode.next(true);
        setTimeout(() => {
          this.inputBox.nativeElement.focus();
        }, 1);
      });
  }

  private editModeHandler() {
    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({ target }) => this.element.contains(target) === false),
      take(1)
    );

    this.editMode$
      .pipe(
        // switchMapTo(clickOutside$)
        switchMap((event) => clickOutside$)
        // untilDestroyed(this)
      )
      .subscribe((event) => {
        this.toViewMode();
      });
  }

  saveData() {
    this.data = this.updatedData;
    this.mode = 'view';
  }
}
