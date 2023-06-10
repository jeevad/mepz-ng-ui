import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from 'src/app/service/department/department.service';
@Component({
  selector: 'app-department-transaction',
  templateUrl: './department-transaction.component.html',
  styleUrls: ['./department-transaction.component.css'],
})
export class DepartmentTransactionComponent {
  departmentData: any[] = [];
  selectedDepartments: any[] = [];
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  projectId: any;
  searchText: string = ''; // For search bar
  filteredDepartmentData: any[] = []; // For search bar
  projectDepartments: any;

  constructor(
    private departmentService: DepartmentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.loadDepartmentData();
    // this.loadSelectedDepartments();
    this.loadProjectDepartments();
  }

  // Add selected departments
  addDepartments(): void {
    const selectedItems = this.departmentData.filter((item) => item.selected);

    const departmentData = {
      departments: selectedItems.map((item) => ({
        departmentId: item._id,
        name: item.name,
        code: item.code,
      })),
    };
    this.departmentService
      .saveDepartments(this.projectId, departmentData)
      .subscribe({
        next: (response) => {
          console.log('Departments saved successfully', response);
          this.loadProjectDepartments();
        },
        error: (error) => {
          console.error('Failed to save departments', error);
        },
      });
  }

  // Load department data from the service  | Sidebar
  loadDepartmentData(): void {
    this.departmentService.Load(0, 10).subscribe((data: any) => {
      // this.selectedDepartments = data.departments;
      this.departmentData = data.results;
      // this.filteredDepartmentData = this.departmentData.slice();  //For search bar
    });
  }

  //Search Bar function
  searchDepartmentList(): void {
    if (this.searchText.trim() !== '') {
      this.filteredDepartmentData = this.projectDepartments.filter(
        (department: any) =>
          department.name
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          department.code.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredDepartmentData = this.projectDepartments.slice();
    }
  }

  // Load project departments List
  loadProjectDepartments(): void {
    this.skip = this.limit * (this.page - 1);
    this.departmentService
      .getSelectedDepartments(this.projectId, this.skip, this.limit)
      .subscribe((data: any) => {
        this.projectDepartments = data.results[0].departments;
        this.filteredDepartmentData = this.projectDepartments.slice(); //For search bar
        // this.count = data.count;
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
}
