import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DepartmentService } from 'src/app/service/department/department.service';
import { HttpClient } from '@angular/common/http';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MyCustomDialogService } from 'src/app/components/my-custom-dialog/my-custom-dialog.service';
import { ToasterService } from '@app/components/toaster/toaster.service';

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
  maxSize: number = 5;

  constructor(
    private department: DepartmentService,
    private departmentService: DepartmentService,
    private http: HttpClient,
    private breakpointObserver: BreakpointObserver,
    private customDialog: MyCustomDialogService,
    public toastService: ToasterService
  ) {
    this.Load(); // Initial loading of departments
  }

  ngOnInit() {
    this.Load(); // Initial loading of departments
    this.loadDepartmentData(); // Load department data for display
    this.reponsivePagination();
  }

  reponsivePagination(){
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe(result => {
      if (result.matches) {
        this.maxSize = 1;
      } else {
        this.maxSize = 5;
      }
    });
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
    this.loader = true;
    this.skip = this.limit * (this.page - 1);
    this.department.Load(this.skip, this.limit).subscribe((data: any) => {
      this.departmentData = data.results; // Update departmentData array with loaded data
      this.count = data.count; // Update total count of items
      this.loader = false;
    });
  }

  // Delete department by ID
  delete(id: any) {
    const dialogRef = this.customDialog.openConfirmDialog({
      dialogMsg: 'Are you sure want to delete?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.loader = true;
        this.department.Removedata(id).subscribe((data) => {
          this.loader = false;
          this.toastService.show('Department deleted', {
            classname: 'bg-danger text-light',
            delay: 10000,
          });
          this.Load();
        });
      }
    });
  }
}
