import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { ProjectService } from 'src/app/service/project/project.service';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  departmentData: any;
  animal!: string;
  name!: string;

  constructor(
    public dialog: MatDialog,
    private department: ProjectService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadDataTable();
    this.Load();
  }

  loadDataTable() {
    $(function () {
      $('#example').DataTable({
        responsive: true,
        // columnDefs: [{ responsivePriority: 2, targets: -1 }],
      });
    });
  }

  Load() {
    this.department.Load().subscribe((data) => {
      this.departmentData = data;
    });
  }

  delete(id: any) {
    if (confirm('delete?')) {
      this.department.Removedata(id).subscribe((data) => {
        this.Load();
      });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      data: { name: this.departmentData, data: this.departmentData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  buttonInRowClick(event: any): void {
    event.stopPropagation();
    console.log('Button in the row clicked.');
  }

  wholeRowClick(): void {
    console.log('Whole row clicked.');
  }

  nextButtonClickEvent(): void {
    //do next particular records like  101 - 200 rows.
    //we are calling to api
    console.log('next clicked');
  }

  previousButtonClickEvent(): void {
    //do previous particular the records like  0 - 100 rows.
    //we are calling to API
  }
}
