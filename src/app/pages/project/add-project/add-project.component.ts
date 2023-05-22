import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/service/project/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent {
  departmentdata: any;
  active: any = ['Active', 'Inactive'];
  message = '';
  messageclass = '';
  error = false;
  isEdit = false;
  deptid: any;
  editdata: any;
  submitted = false;
  addDepartment!: FormGroup;

  constructor(
    private department: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.deptid = this.route.snapshot.paramMap.get('id');

    this.route.params.subscribe((param) => {
      if (param && param['id']) {
        this.department.LoadbyID(param['id']).subscribe((resp) => {
          this.isEdit = true;
          this.addDepartment.patchValue(resp);
        });
      }
    });
    this.addDepartment = this.formBuilder.group({
      code: ['', Validators.required],
      projectname: ['', Validators.required],
      fullProjectName: ['', Validators.required],
      clientOwner: ['', Validators.required],
      contractNo: ['', Validators.required],
      classification: ['', Validators.required],
      projecttype: ['', Validators.required],
      company: ['', Validators.required],
      signature1: [''],
      signature2: [''],
      remarks: [''],
      noofBeds: ['', Validators.required],
    });
  }

  SaveData() {
    if (!this.isEdit) {
      this.submitted = true;
      if (this.addDepartment.valid) {
        this.department
          .SaveData(this.addDepartment.value)
          .subscribe((result) => {
            this.router.navigate(['/project']);
          });
      }
    } else if (this.isEdit) {
      this.submitted = true;
      if (this.addDepartment.valid) {
        this.department
          .update(this.deptid, this.addDepartment.value)
          .subscribe((data) => {
            this.isEdit = false;
            this.router.navigate(['/project']);
          });
      }
    }
  }

  change(e: any) {
    this.active = e.target.value;
  }
}
