import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/service/project/project.service';
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
  animal!: string;
  name!: string;
  searchText: string = ''; // For search bar
  filteredEquipmentData: any[] = []; // For search bar
  loader: boolean = false;
  projectType: string | null = 'individual';

  constructor(
    private department: ProjectService,
    private route: ActivatedRoute // private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.projectType = this.route.snapshot.paramMap.get('projectType');
    this.Load();
  }

  // Loads the initial data
  Load() {
    this.loader = true;
    this.skip = this.limit * (this.page - 1);
    this.department.Load(this.skip, this.limit).subscribe((data: any) => {
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

  // Deletes an item
  delete(id: any) {
    if (confirm('delete?')) {
      this.department.Removedata(id).subscribe((data) => {
        this.Load();
      });
    }
  }
}
