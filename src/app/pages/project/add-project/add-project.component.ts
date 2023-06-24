import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
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
  addProjectForm!: FormGroup;
  projectType: string | null = 'individual';
  isTemplate = false;

  constructor(
    private department: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.deptid = this.route.snapshot.paramMap.get('id');
    this.projectType = this.route.snapshot.paramMap.get('projectType');

    this.route.params.subscribe((param) => {
      if (param && param['id']) {
        this.department.LoadbyID(param['id']).subscribe((resp) => {
          this.isEdit = true;
          this.addProjectForm.patchValue(resp);
        });
      }
    });
    let fromGroup = {};
    if (this.projectType === 'template') {
      this.isTemplate = true;
      fromGroup = {
        // code: ['', Validators.required],
        name: ['', Validators.required],
        // fullName: ['', Validators.required],
        // clientOwner: ['', Validators.required],
        // contractNo: ['', Validators.required],
        classification: ['', Validators.required],
        type: ['', Validators.required],
        // company: ['', Validators.required],
        // signature1: [''],
        // signature2: [''],
        remarks: [''],
        isTemplate: [true],
        noOfBeds: ['', Validators.required],
      };
    } else {
      console.log('in-----');
      
      fromGroup = {
        code: ['', Validators.required],
        name: ['', Validators.required],
        fullName: ['', Validators.required],
        clientOwner: ['', Validators.required],
        contractNo: ['', Validators.required],
        classification: ['', Validators.required],
        type: ['', Validators.required],
        company: ['', Validators.required],
        signature1: [''],
        signature2: [''],
        remarks: [''],
        isTemplate: [false],
        noOfBeds: ['', Validators.required],
      };
    }
    this.addProjectForm = this.formBuilder.group(fromGroup);
  }

  SaveData() {
    this.getFormValidationErrors();
    console.log('this.addProjectForm.valid',this.addProjectForm.valid);
    
    if (!this.isEdit) {
      this.submitted = true;
      if (this.addProjectForm.valid) {
        this.department
          .SaveData(this.addProjectForm.value)
          .subscribe((result) => {
            this.router.navigate([`pages/projects/${this.projectType}/list`]);
          });
      }
    } else if (this.isEdit) {
      this.submitted = true;
      if (this.addProjectForm.valid) {
        this.department
          .update(this.deptid, this.addProjectForm.value)
          .subscribe((data) => {
            this.isEdit = false;
            this.router.navigate([`pages/projects/${this.projectType}/list`]);
          });
      }
    }
  }

  change(e: any) {
    this.active = e.target.value;
  }

  getFormValidationErrors() {
    Object.keys(this.addProjectForm.controls).forEach((key) => {
      const controlErrors: ValidationErrors | null | undefined =
        this.addProjectForm?.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(
            'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
            controlErrors[keyError]
          );
        });
      }
    });
  }
}
