import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ProjectService } from 'src/app/service/project/project.service';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { DeletedialogComponent } from '../../deletedialog/deletedialog.component';

export interface DialogData {
  animal: string;
  name: string;

}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  departmentData: any[] = [];
  animal!: string;
  name!: string;

  constructor(
    public dialog: MatDialog,
    private department: ProjectService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.Load();
  }

  loadDataTable() {
    $(function () {
      $('#example').DataTable({
        responsive: true,
      });
    });
  }

  Load() {
    this.skip = this.limit * (this.page - 1);
    this.department.Load(this.skip, this.limit).subscribe((data: any) => {
      this.departmentData = data.results;
      this.count = data.count;
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

      this.animal = result;
    });
  }

  buttonInRowClick(event: any): void {
    event.stopPropagation();

  }

  wholeRowClick(): void {

  }

  nextButtonClickEvent(): void {

  }

  previousButtonClickEvent(): void {

  }
}
