import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ProjecttemplateService } from 'src/app/service/projecttemplate/projecttemplate.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-template',
  templateUrl: './project-template.component.html',
  styleUrls: ['./project-template.component.css'],
})
export class ProjectTemplateComponent implements OnInit {
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  projectTempData: any[] = [];

  constructor(
    private department: ProjecttemplateService,
    private http: HttpClient
  ) {
    this.Load();
  }
  ngOnInit() {
    this.Load();
  }
  Load() {
    this.skip = this.limit * (this.page - 1);
    this.department.Load(this.skip, this.limit).subscribe((data: any) => {
      this.projectTempData = data.results;
      this.count = data.count;
    });
  }
  delete(id: any) {
    if (confirm('delete?')) {
      this.department.Removedata(id).subscribe((data) => {
        this.Load();
      });
    }
  }
}
