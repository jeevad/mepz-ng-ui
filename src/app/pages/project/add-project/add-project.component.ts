import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from '@app/components/toaster/toaster.service';
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
  loader: boolean = false;

  constructor(
    private department: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public toastService: ToasterService,
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
      console.log("this.projectType >> ",this.projectType);
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
        remarks: ['',Validators.required],
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
        contractNo : ["",[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]],
        classification: ['', Validators.required],
        type: ['', Validators.required],
        company: ['', Validators.required],
        signature1: ['', Validators.required],
        signature2: ['', Validators.required],
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
        this.loader = true;
        this.department
          .SaveData(this.addProjectForm.value)
          .subscribe((result) => {
            this.loader = false;
            this.toastService.show('Project created', {
              classname: 'bg-success text-light',
              delay: 10000,
            });
            this.router.navigate([`pages/projects/${this.projectType}/list`]);
          });
      }
    } else if (this.isEdit) {
      this.submitted = true;
      if (this.addProjectForm.valid) {
        this.loader = true;
        this.department
          .update(this.deptid, this.addProjectForm.value)
          .subscribe((data) => {
            this.isEdit = false;
            this.loader = false;
            console.log('in-----');
            
            this.toastService.show('Updated project', {
              classname: 'bg-success text-light',
              delay: 10000,
            });
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
