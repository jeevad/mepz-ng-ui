import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DepartmentService } from 'src/app/service/department/department.service';
import { HttpClient } from '@angular/common/http';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  page = 1; // Current page number
  limit = 10; // Number of items per page
  skip = 0; // Number of items to skip
  count: number = 0; // Total number of items
  departmentData: any[] = []; // Array to store department data
  loader: boolean = false;

  constructor(
    private department: DepartmentService,
    private departmentService: DepartmentService,
    private http: HttpClient
  ) {
    this.Load(); // Initial loading of departments
  }

  ngOnInit() {
    this.Load(); // Initial loading of departments
    this.loadDepartmentData(); // Load department data for display
  }

  // Load department data from the server
  loadDepartmentData(): void {
    this.loader = true;
    this.departmentService.Load(0, 10).subscribe((data: any) => {
      this.departmentData = data.results;
      this.loader = false;
    });
  }

  // Load departments based on pagination settings
  Load() {
    this.skip = this.limit * (this.page - 1);
    this.department.Load(this.skip, this.limit).subscribe((data: any) => {
      this.departmentData = data.results; // Update departmentData array with loaded data
      this.count = data.count; // Update total count of items
    });
  }

  // Delete department by ID
  delete(id: any) {
    if (confirm('Delete?')) {
      this.department.Removedata(id).subscribe((data) => {
        this.Load(); // Reload departments after deletion
      });
    }
  }
}
