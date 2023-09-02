import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from '@app/components/toaster/toaster.service';
import { MyCustomDialogService } from 'src/app/components/my-custom-dialog/my-custom-dialog.service';
import { DepartmentService } from 'src/app/service/department/department.service';
import { ProjectService } from 'src/app/service/project/project.service';
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
  projectType: string | null = 'individual';
  departmentId: any;
  showModal: boolean = false;

  constructor(
    private departmentService: DepartmentService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    public toastService: ToasterService,
    private customDialog: MyCustomDialogService
  ) { }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.projectType = this.route.snapshot.paramMap.get('projectType');
    this.loadDepartmentData();
    this.loadProjectDepartments();
  }

  openAddDeptMod(){
    this.showModal = true;
  }

  closeModal(){
    this.showModal = false;
  }

  // Add selected departments
  addDepartments(): void {
    this.loader = true;
    const selectedItems = this.departmentData.filter((item) => item.selected);
    const departmentData = {
      departments: selectedItems.map((item) => ({
        masterId: item._id,
        name: item.name,
        alias: item.name,
        code: item.code,
      })),
    };
    this.departmentService.saveDepartments(this.projectId, departmentData).subscribe({next: (response) => {
          // console.log('Departments saved successfully', response);
          this.loadProjectDepartments();
          this.showModal = false;
          this.loader = false;
          this.toastService.show(
            selectedItems.length === 1 ? selectedItems.length + ' Department added' : selectedItems.length + ' Departments added', {
              classname: 'bg-success text-light',
              delay: 10000,
            }
          );
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

  // Delete a department
  deleteDepartment(departmentId: string): void {
    const dialogRef = this.customDialog.openConfirmDialog({
      dialogMsg: 'Are you sure want to delete?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result === 'ok') {
        const data = {
          type: 'department',
          // field: isDeleted:true,
          departmentId: this.departmentId,
          value: departmentId,
        };

        this.projectService.saveProjectField(this.projectId, data).subscribe({
          next: () => {
            this.toastService.show('Department deleted', {
              classname: 'bg-danger text-light',
              delay: 10000,
            });
            this.loadProjectDepartments();
          },
          error: (error) => {
            console.error('Failed to delete department', error);
          },
        });
      }
    });
  }

    // Deletes an item




  // Function triggered when the "COPY" button is clicked | Without DB
  copyDepartments(department: any): void {
    if (department.selected) {
      const clonedDepartment = { ...department };
      const clonedCode = this.getClonedCode(department.code);
      clonedDepartment.code = clonedCode;
      this.departmentData.push(clonedDepartment);
      this.filteredDepartmentData.push(clonedDepartment);
    }
  }

  // Function triggered when the "COPY" button is clicked | With DB
  // copyDepartments(): void {
  //   const selectedDepartments = this.filteredDepartmentData.filter((department) => department.selected);
  //   selectedDepartments.forEach((department) => {
  //     const clonedDepartment = { ...department };
  //     const clonedCode = this.getClonedCode(department.code);
  //     clonedDepartment.code = clonedCode;
  //     const data = {
  //       type: 'department',
  //       field: 'create',
  //       departmentId: department._id,
  //       value: clonedDepartment
  //     };
  //     this.projectService.saveProjectField(this.projectId, data).subscribe({
  //       next: () => {
  //         console.log('Cloned department saved successfully');
  //         this.loadProjectDepartments();
  //       },
  //       error: (error) => {
  //         console.error('Failed to save cloned department', error);
  //       },
  //     });
  //     this.departmentData.push(clonedDepartment);
  //     this.filteredDepartmentData.push(clonedDepartment);
  //   });
  // }

  // Function to generate the cloned code by incrementing the number
  getClonedCode(code: string): string {
    const regex = /(.+)(\(\d+\))?/;
    const match = code.match(regex);
    if (match) {
      const baseCode = match[1] || '';
      const number = match[2] ? parseInt(match[2].substring(1, match[2].length - 1)) : 0;
      const clonedNumber = number + 1;
      return `${baseCode}(${clonedNumber})`;
    }
    return code;
  }

}
