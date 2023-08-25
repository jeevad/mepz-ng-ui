import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EquipmentService } from 'src/app/service/equipment/equipment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css'],
})
export class AddEquipmentComponent implements OnInit {
  equipmentData: any;
  active: any = ['Active', 'Inactive'];
  message = '';
  messageclass = '';
  error: boolean = false;
  isEdit: boolean = false;
  deptid: any;
  editdata: any;
  submitted: boolean = false;
  addEquipment!: FormGroup;


  constructor(
    private department: EquipmentService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Get equipment ID from the route parameter
    this.deptid = this.route.snapshot.paramMap.get('id');

    // Check if equipment ID exists in the route params for edit mode
    this.route.params.subscribe((param) => {
      if (param && param['id']) {
        // Load equipment data by ID for editing
        this.department.LoadbyID(param['id']).subscribe((resp) => {
          this.isEdit = true;
          this.addEquipment.patchValue(resp);
        });
      }
    });

    // Initialize the form with form controls and validators
    this.addEquipment = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      cost: ['', Validators.required],
      markUp: ['', Validators.required],
      heatDissipation: ['', Validators.required],
      ictPort: ['', Validators.required],
      bssPort: ['', Validators.required],
    });
  }

  // Save equipment data
  SaveData() {
    this.submitted = true;
    if (this.addEquipment.valid) {
      if (!this.isEdit) {
        // Save new equipment data
        this.department.SaveData(this.addEquipment.value).subscribe((result) => {
          this.router.navigate(['pages/equipment-data']);
        });
      } else {
        // Update existing equipment data
        this.department.update(this.deptid, this.addEquipment.value).subscribe((data) => {
          this.isEdit = false;
          this.router.navigate(['pages/equipment-data']);
        });
      }
    }
  }

  // Handle change event for the active dropdown
  change(e: any) {
    this.active = e.target.value;
  }
}
