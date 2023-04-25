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
  departmentData: any;

  constructor(
    private department: ProjecttemplateService,
    private http: HttpClient
  ) {
    this.Load();
  }
  ngOnInit() {
    $(function () {
      $('.example').DataTable({
        responsive: true,
        // columnDefs: [{ responsivePriority: 2, targets: -1 }],
      });
    });
  }
  Load() {
    this.department.Load().subscribe((data) => {
      this.departmentData = data;
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
