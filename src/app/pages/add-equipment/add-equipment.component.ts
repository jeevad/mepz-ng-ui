import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EquipmentService } from 'src/app/service/equipment/equipment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css'],
})
export class AddEquipmentComponent implements OnInit {
  equipmentdata: any;
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
    this.deptid = this.route.snapshot.paramMap.get('id');

    this.route.params.subscribe((param) => {
      if (param && param['id']) {
        this.department.LoadbyID(param['id']).subscribe((resp) => {
          this.isEdit = true;
          this.addEquipment.patchValue(resp);
        });
      }
    });
    this.addEquipment = this.formBuilder.group({
      equipmentCode: ['', Validators.required],
      equipmentName: ['', Validators.required],
      cost: ['', Validators.required],
      markUp: ['', Validators.required],
      heatDissipation: ['', Validators.required],
      ictPort: ['', Validators.required],
      bssPort: ['', Validators.required],
    });
  }

  SaveData() {
    this.submitted = true;
    if (this.addEquipment.valid) {
      if (!this.isEdit) {
        this.department
          .SaveData(this.addEquipment.value)
          .subscribe((result) => {
            this.router.navigate(['/equipment-data']);
          });
      } else {
        this.department
          .update(this.deptid, this.addEquipment.value)
          .subscribe((data) => {
            this.isEdit = false;
            this.router.navigate(['/equipment-data']);
          });
      }
    }
  }

  change(e: any) {
    this.active = e.target.value;
  }
}
