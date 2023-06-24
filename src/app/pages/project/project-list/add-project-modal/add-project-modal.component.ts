import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ProjectService } from 'src/app/service/project/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-project-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.css'],
})
export class AddProjectModalComponent {
  departmentdata: any;
  active: any = ['Active', 'Inactive'];
  message = '';
  messageclass = '';
  error = false;
  isEdit = false;
  projectId: any;
  editdata: any;
  submitted = false;
  addProjectForm!: FormGroup;
  projectType: string | null = 'individual';
  isTemplate = false;

  constructor(
    private service: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddProjectModalComponent>
  ) {}
  ngOnInit(): void {
    this.projectId = this.data.projectId;
    this.projectType = this.data.projectType;
    this.getProject();

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
        departments: [''],
      };
    }
    this.addProjectForm = this.formBuilder.group(fromGroup);
  }

  getProject() {
    if (this.projectId) {
      this.service.LoadbyID(this.projectId).subscribe((resp) => {
        this.isEdit = true;
        this.addProjectForm.patchValue(resp);
      });
    }
  }
  SaveData() {
    this.getFormValidationErrors();
    // console.log('this.addProjectForm.valid', this.addProjectForm.valid);

    if (!this.isEdit || this.data.formType === 'createFromTemplate') {
      this.submitted = true;
      if (this.addProjectForm.valid) {
        if(this.data.formType === 'createFromTemplate') {
          this.addProjectForm.value.isTemplate = false;
        }
        this.service.SaveData(this.addProjectForm.value).subscribe((result) => {
          this.dialogRef.close('success');
        });
      }
    } else if (this.isEdit) {
      this.submitted = true;
      if (this.addProjectForm.valid) {
        this.service
          .update(this.projectId, this.addProjectForm.value)
          .subscribe((data) => {
            this.isEdit = false;
            // this.router.navigate([`pages/projects/${this.projectType}/list`]);
            this.dialogRef.close('success');
          });
      }
    }
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
