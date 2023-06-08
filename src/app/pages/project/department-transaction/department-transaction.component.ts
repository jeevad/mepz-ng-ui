import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DepartmentService } from 'src/app/service/department/department.service';

@Component({
  selector: 'app-department-transaction',
  templateUrl: './department-transaction.component.html',
  styleUrls: ['./department-transaction.component.css'],
})
export class DepartmentTransactionComponent {
  item: any[] = [];
  departmentData: any[] = [];
  selectedDepartments: any[] = [];
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  // projectId = '64735b04ef112ca4b26872ca';
  projectId = '647099f81d7513b34418f744';
  projectIdNew = '64709a2d1d7513b34418f748';
  // projectIdNew = '64735c1def112ca4b268730e';
  selectedDepartmentsRooms: any;

  constructor(
    private departmentService: DepartmentService,
    private http: HttpClient
  ) {
    this.loadSelectedDepartments();
    this.loadDepartmentData();
  }

  ngOnInit() {
    // Initialize DataTables and set up event listeners
    let table = $('#example').DataTable({
      drawCallback: () => {
        $('.paginate_button.next').on('click', () => {
          this.nextButtonClickEvent();
        });
      },
    });

    let table1 = $('#example1').DataTable({
      drawCallback: () => {
        $('.paginate_button.next').on('click', () => {
          this.nextButtonClickEvent();
        });
      },
    });

    let table2 = $('#example2').DataTable({
      drawCallback: () => {
        $('.paginate_button.next').on('click', () => {
          this.nextButtonClickEvent();
        });
      },
    });

    // Load department data and selected departments
    this.loadDepartmentData();
    this.loadSelectedDepartments();
  }

  // Add selected departments
  addDepartments(): void {
    const selectedItems = this.departmentData.filter((item) => item.selected);

    const departmentData = {
      departments: selectedItems.map((item) => ({
        name: item.name,
        code: item.code,
      })),
    };

    this.departmentService.saveDepartments(departmentData).subscribe({
      next: (response) => {
        console.log('Departments saved successfully', response);
        this.loadSelectedDepartments();
        this.loadDepartmentData();
      },
      error: (error) => {
        console.error('Failed to save departments', error);
      },
    });
  }

  // Load department data from the service  | Sidebar
  loadDepartmentData(): void {
    this.departmentService.Load(0, 10).subscribe((data: any) => {
      this.departmentData = data.results;
    });
  }

  // Load selected departments List
  loadSelectedDepartments(): void {
    this.skip = this.limit * (this.page - 1);
    this.departmentService
      .getSelectedDepartments(this.skip, this.limit)
      .subscribe((data: any) => {
        this.selectedDepartments = data.departments;
        this.count = data.count;
        console.log(this.selectedDepartments[0].rooms);
      });
  }

  // Toggle selection of a department
  toggleSelection(index: number): void {
    this.departmentData[index].selected = !this.departmentData[index].selected;
  }

  // Event handler for button click within a row
  buttonInRowClick(event: any): void {
    event.stopPropagation();
  }

  // Event handler for whole row click
  wholeRowClick(): void {}

  // Event handler for next button click
  nextButtonClickEvent(): void {}

  // Event handler for previous button click
  previousButtonClickEvent(): void {}
}
