import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/service/department/department.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css'],
})
export class AddDepartmentComponent implements OnInit {
  departmentdata: any;
  active: boolean = false;
  selectedActive: string;
  message = '';
  messageclass = '';
  error: boolean = false;
  isEdit: boolean = false;
  deptid: any;
  editdata: any;
  submitted: boolean = false;
  addDepartment!: FormGroup;

  constructor(
    private department: DepartmentService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.selectedActive = '';
  }

  ngOnInit(): void {
    // Get department ID from the route parameter
    this.deptid = this.route.snapshot.paramMap.get('id');

    // Check if department ID exists in the route params for edit mode
    this.route.params.subscribe((param) => {
      if (param && param['id']) {
        // Load department data by ID for editing
        this.department.LoadbyID(param['id']).subscribe((resp) => {
          this.isEdit = true;
          this.addDepartment.patchValue(resp);
        });
      }
    });

    // Initialize the form with form controls and validators
    this.addDepartment = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      active: [''],
    });
  }

  // Save department data
  SaveData() {
    if (!this.isEdit) {
      this.submitted = true;
      if (this.addDepartment.valid) {
        // Save new department data
        this.department.SaveData(this.addDepartment.value).subscribe((result) => {
          this.router.navigate(['pages/department']);
        });
      }
    } else if (this.isEdit) {
      this.submitted = true;
      if (this.addDepartment.valid) {
        // Update existing department data
        this.department.update(this.deptid, this.addDepartment.value).subscribe((data) => {
          this.isEdit = false;
          this.router.navigate(['pages/department']);
        });
      }
    }
  }

  // Handle change event for the active dropdown
  change(e: any) {
    this.active = e.target.value === 'Active';
  }
}
