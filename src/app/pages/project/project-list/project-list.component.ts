import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project/project.service';
import { AddProjectModalComponent } from './add-project-modal/add-project-modal.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MyCustomDialogService } from 'src/app/components/my-custom-dialog/my-custom-dialog.service';
// import { NgxSpinnerService } from 'ngx-spinner';

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
  name!: string;
  searchText: string = ''; // For search bar
  filteredEquipmentData: any[] = []; // For search bar
  loader: boolean = false;
  projectType: any = 'individual';
  maxSize: number = 5;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute, // private spinner: NgxSpinnerService
    private router: Router,
    public dialog: MatDialog,
    private customDialog: MyCustomDialogService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.projectType = this.route.snapshot.paramMap.get('projectType');
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.projectType = this.route.snapshot.paramMap.get('projectType');
        setTimeout(() => {
          // window.scrollTo(0, 0);
          this.Load();
        }, 1);
      }
    });
    this.Load();
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

  // Loads the initial data
  Load(page?: number | undefined) {

    this.loader = true;
    this.page = page === undefined ? this.page : page;

    this.skip = this.limit * (this.page - 1);
    this.projectService
      .Load(this.skip, this.limit, this.projectType)
      .subscribe((data: any) => {
        this.departmentData = data.results;
        this.count = data.count;
        this.filteredEquipmentData = this.departmentData.slice(); //For search bar
        this.loader = false;
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

  addProjectModal(project: any) {
    const dialogRef = this.dialog.open(AddProjectModalComponent, {
      data: {
        projectType: 'individaul',
        projectId: project._id,
        formType: 'createFromTemplate',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.Load(1);
      }
    });
  }
  // Deletes an item
  delete(id: any) {
    const dialogRef = this.customDialog.openConfirmDialog({
      dialogMsg: 'Are you sure want to delete?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.projectService.Removedata(id).subscribe((data) => {
          this.Load();
        });
      }
    });
  }
}
