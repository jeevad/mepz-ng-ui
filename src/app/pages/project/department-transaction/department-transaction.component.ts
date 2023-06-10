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
  item: any[] = [];
  department: any[] = [];
  departmentData: any[] = [];
  selectedDepartments: any[] = [];
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  projectIdNew = '6481b8f4bcf2bf4cfef8d313';
  selectedDepartmentsRooms: any;
  projectId: any;
  searchTerm: string = ''; // For search bar
  filteredData: any[] = []; // For search bar

  constructor(
    private departmentService: DepartmentService,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {
    // this.loadSelectedDepartments();
    // this.loadDepartmentData();
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.loadDepartmentData();
    this.loadSelectedDepartments();

    // Initialize DataTables and set up event listeners
    // let table = $('#example').DataTable({
    //   drawCallback: () => {
    //     $('.paginate_button.next').on('click', () => {
    //       this.nextButtonClickEvent();
    //     });
    //   },
    // });

    // let table1 = $('#example1').DataTable({
    //   drawCallback: () => {
    //     $('.paginate_button.next').on('click', () => {
    //       this.nextButtonClickEvent();
    //     });
    //   },
    // });

    // let table2 = $('#example2').DataTable({
    //   drawCallback: () => {
    //     $('.paginate_button.next').on('click', () => {
    //       this.nextButtonClickEvent();
    //     });
    //   },
    // });
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
    this.departmentService.saveDepartments(this.projectId, departmentData).subscribe({
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
      this.filteredData = this.departmentData; //For search bar
    });
  }

  // For search bar | Filters the data based on the search term
  filterData() {
    if (!this.searchTerm) {
      this.filteredData = this.departmentData;
    } else {
      this.filteredData = this.departmentData.filter((department) =>
        this.matchesSearchTerm(department)
      );
    }
  }

  // For search bar | Checks if an item matches the search term
  matchesSearchTerm(department: any): boolean {
    const searchFields = [
      department.code,
      department.name,
      department.type,
      department.company
    ];

    for (const field of searchFields) {
      if (field && field.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        return true;
      }
    }

    return false;
  }

  // Load selected departments List
  loadSelectedDepartments(): void {
    this.skip = this.limit * (this.page - 1);
    this.departmentService
      .getSelectedDepartments(this.projectId, this.skip, this.limit)
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

  wholeRowClick(): void { }

  nextButtonClickEvent(): void { }

  previousButtonClickEvent(): void { }
}
