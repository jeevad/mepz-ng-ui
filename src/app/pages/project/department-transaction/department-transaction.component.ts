import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from 'src/app/service/department/department.service';
@Component({
  selector: 'app-department-transaction',
  templateUrl: './department-transaction.component.html',
  styleUrls: ['./department-transaction.component.scss'],
})
export class DepartmentTransactionComponent {
  departmentData: any[] = [];
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  projectId: any;
  searchText: string = ''; // For search bar
  filteredDepartmentData: any[] = []; // For search bar
  projectDepartments: any;
  project: any;
  loader = false;

  constructor(
    private departmentService: DepartmentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.loadDepartmentData();
    this.loadProjectDepartments();
  }

  // Add selected departments
  addDepartments(): void {
    const selectedItems = this.departmentData.filter((item) => item.selected);
    const departmentData = {
      departments: selectedItems.map((item) => ({
        departmentId: item._id,
        name: item.name,
        alias: item.name,
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
    this.loader = true;
    this.departmentService.Load(0, 10).subscribe((data: any) => {
      this.departmentData = data.results;
      this.loader = false;
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
      .getProjectDepartments(this.projectId, this.skip, this.limit)
      .subscribe((data: any) => {
        this.project = data.results[0];
        // this.projectDepartments = data.results[0].departments;
        this.projectDepartments = this.project?.departments || []; // Assign departments to selected projectlist
        this.filteredDepartmentData = this.projectDepartments.slice(); // For search bar
      });
  }

  // Select all departments | for select/deselect checkbox
  selectAllDepartments(): void {
    this.filteredDepartmentData.forEach(department => department.selected = true);
    this.areAllDepartmentsSelected();
  }

  // Deselect all departments | for select/deselect checkbox
  deselectAllDepartments(): void {
    this.filteredDepartmentData.forEach(department => department.selected = false);
  }

  // Function to check if all departments are selected | for select/deselect checkbox
  areAllDepartmentsSelected(): boolean {
    const selectedCount = this.filteredDepartmentData.filter(department => department.selected).length;
    return selectedCount === this.filteredDepartmentData.length;
  }

  // Toggle selection for a department | for select/deselect checkbox
  toggleSelection(department: any): void {
    department.selected = !department.selected;
  }

  // Toggle select all departments | for select/deselect checkbox
  toggleSelectAllDepartments(): void {
    if (this.areAllDepartmentsSelected()) {
      this.deselectAllDepartments();
    } else {
      this.selectAllDepartments();
    }
  }

}
