import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/service/department/department.service';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from '@app/components/toaster/toaster.service';

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
  loader: boolean = false;

  constructor(
    private department: DepartmentService,
    private router: Router,
    private route: ActivatedRoute,
    public toastService: ToasterService,
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
        this.loader = true;
        // Load department data by ID for editing
        this.department.LoadbyID(param['id']).subscribe((resp) => {
          this.isEdit = true;
          this.loader = false;
          this.addDepartment.patchValue(resp);
        });
      }
    });

    // Initialize the form with form controls and validators
    this.addDepartment = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      active: ['', Validators.required],
    });
  }

  // Save department data
  SaveData() {
    if (!this.isEdit) {
      this.submitted = true;
      if (this.addDepartment.valid) {
        this.loader = true;
        // Save new department data
        this.department.SaveData(this.addDepartment.value).subscribe((result) => {
          this.loader = false;
          this.toastService.show('Department created', {
            classname: 'bg-success text-light',
            delay: 10000,
          });
          this.router.navigate(['pages/department']);
        });
      }
    } else if (this.isEdit) {
      this.submitted = true;
      if (this.addDepartment.valid) {
        this.loader = true;
        // Update existing department data
        this.department.update(this.deptid, this.addDepartment.value).subscribe((data) => {
          this.loader = false;
          this.isEdit = false;
          this.toastService.show('Department updated', {
            classname: 'bg-success text-light',
            delay: 10000,
          });
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
