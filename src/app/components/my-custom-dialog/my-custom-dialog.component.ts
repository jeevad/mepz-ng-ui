import { Component, Inject } from '@angular/core';
import { CustomDialogConfig } from './my-custom-dialog-config.interface';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-my-custom-dialog',
  templateUrl: './my-custom-dialog.component.html',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
})
export class MyCustomDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public config: CustomDialogConfig) {}

  // TODO(Chan4077): Rename this function
  /**
   * Returns the value of a variable or its default equivalant
   * @returns The value of the variable/its default equivalant if it is untruthy
   */
  getValOrDefaultVal(val: any, defaultVal: any): any {
    return val ? val : defaultVal;
  }

  /**
   * Checks if the dialog message is HTML
   */
  get isDialogMsgHtml(): boolean {
    return typeof this.config.dialogMsg === 'object';
  }
}
