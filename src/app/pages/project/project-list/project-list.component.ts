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
import { FormsModule } from '@angular/forms';

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
  searchText: string = ''; // For search bar
  filteredEquipmentData: any[] = []; // For search bar

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

  // Loads the initial data
  Load() {
    this.skip = this.limit * (this.page - 1);
    this.department.Load(this.skip, this.limit).subscribe((data: any) => {
      this.departmentData = data.results;
      this.count = data.count;
      this.filteredEquipmentData = this.departmentData.slice(); //For search bar
    });
  }

  //Search Bar function
  searchProjectList(): void {
    if (this.searchText.trim() !== '') {
      this.filteredEquipmentData = this.departmentData.filter(
        (item: any) =>
          item.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.code.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.type.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.company.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredEquipmentData = this.departmentData.slice();
    }
  }

  // Deletes an item
  delete(id: any) {
    if (confirm('delete?')) {
      this.department.Removedata(id).subscribe((data) => {
        this.Load();
      });
    }
  }

  // Opens the delete dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      data: { name: this.departmentData, data: this.departmentData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.animal = result;
    });
  }
}
