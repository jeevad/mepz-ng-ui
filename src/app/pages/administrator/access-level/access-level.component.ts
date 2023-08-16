import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AdminGroupService } from '@app/service/admin-group/admin-group.service';
import { ProjectService } from '@app/service/project/project.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-access-level',
  templateUrl: './access-level.component.html',
  styleUrls: ['./access-level.component.css'],
})
export class AccessLevelComponent {
  page = 1;
  count: number = 0;
  groupdata: any[] = [];
  limit = 1000;
  skip = 0;
  projectData: any[] = [];
  form: FormGroup;
  submitted: boolean = false;

  constructor(
    private group: AdminGroupService,
    private projectService: ProjectService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      group: ['', [Validators.required]],
      projects: this.fb.array([]),
      reportType: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.loadGroupData();
    this.loadProjects();
  }

  loadGroupData() {
    this.skip = this.limit * (this.page - 1);
    this.group.LoadGroupData(this.skip, this.limit).subscribe((data: any) => {
      this.groupdata = data.results;
      this.count = data.count;
    });
  }

  loadProjects() {
    this.projectService
      .Load(this.skip, this.limit, 'individual')
      .subscribe((data: any) => {
        this.projectData = data.results;
      });
  }

  get projects(): FormArray {
    return this.form.get('projects') as FormArray;
  }

  addProjects(project: any) {
    // console.log('this.form.value.group', this.form.value.group);
    const group = this.form.value.group;
    const crud = project.accessLevel
      ? project.accessLevel.find((item: any) => item.group === group)?.crud
      : '';
    const proj = this.fb.group({
      id: [project.id],
      group: [group],
      name: [project.name],
      code: [project.code],
      view: [crud?.view || false],
      add: [crud?.add || false],
      edit: [crud?.edit || false],
      delete: [crud?.delete || false],
    });
    this.projects.push(proj);
  }
  onChangeGroup() {
    // console.log(this.form.value);
    this.projects.clear();
    this.projectData.forEach((project) => {
      const group = '';
      this.addProjects(project);
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.submitted = true;
    this.projectService
      .updateAccessLevel(this.form.value)
      .subscribe((result) => {
        if (result != null) {
          // this.cleardata();
        }
      });
  }

  cleardata() {
    this.form = new FormGroup({
      // name: new FormControl(''),
    });
  }
}
