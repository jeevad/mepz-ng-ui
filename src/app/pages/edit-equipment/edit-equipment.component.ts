import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EquipmentService } from 'src/app/service/equipment/equipment.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-equipment',
  templateUrl: './edit-equipment.component.html',
  styleUrls: ['./edit-equipment.component.css']
})
export class EditEquipmentComponent {

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
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

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

    // Initialize the form with form controls and validators
    this.addEquipment = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      cost: ['', Validators.required],
      markUp: ['', Validators.required],
      heatDissipation: ['', Validators.required],
      ictPort: ['', Validators.required],
      bssPort: ['', Validators.required],
      remarks: [''],
      utility: [''],
      labels: [''],
      equipmentPackage: this.formBuilder.group({
        package: [''],
        packageRemarks: [''],
      }),
      equipmentPower: this.formBuilder.group({
        heatDissipationPower: [''],
        data: [''],
        bss: [''],
        group: [''],
        typicalPowerConsumption: [''],
        typeOfPower: [''],
        waterInlet: [''],
        drainage: [''],
        ventilationExhaust: [''],
        medicalGas: [''],
        typicalWeight: [''],
        typicalFloorLoading: [''],
        typicalCeilingLoading: [''],
        radiationShielding: [''],
        corridorClearance: [''],
        controlRoom: [''],
        techRoom: [''],
        chiller: [''],
        fileOne: [''],
        fileTwo: [''],
        fileThree: [''],
        powerRemarks: [''],
      }),
      equipmentLabel: this.formBuilder.group({
        equipmentCode: [''],
        equipmentName: [''],
        label: ['']
      })
    });
  }

// All fields are stored except Images------------------------------------------------------------------------
// SaveData() {
//   this.submitted = true;
//   if (this.addEquipment.valid) {
//     if (!this.isEdit) {
//       // Save new equipment data
//       const formData = {
//         ...this.addEquipment.value,
//         equipmentPackage: this.addEquipment.value.equipmentPackage,
//         equipmentPower: this.addEquipment.value.equipmentPower,
//         equipmentLabel: this.addEquipment.value.equipmentLabel
//       };
//       this.department.SaveData(formData).subscribe((result) => {
//         this.router.navigate(['pages/equipment-data']);
//       });
//     } else {
//       // Update existing equipment data
//       const formData = {
//         ...this.addEquipment.value,
//         equipmentPackage: this.addEquipment.value.equipmentPackage,
//         equipmentPower: this.addEquipment.value.equipmentPower,
//         equipmentLabel: this.addEquipment.value.equipmentLabel

//       };
//       this.department.update(this.deptid, formData).subscribe((data) => {
//         this.isEdit = false;
//         this.router.navigate(['pages/equipment-data']);
//       });
//     }
//   }
// }


// Only images are stored---------------------------------------------------------------------------
// SaveData() {
//   this.submitted = true;
//   if (this.addEquipment.valid) {
//     if (!this.isEdit) {
//       // Save new equipment data
//       const formData = new FormData();
//       const fileOneInput = <HTMLInputElement>(
//         document.getElementById('fileOneInput')
//       );
//       const fileTwoInput = <HTMLInputElement>(
//         document.getElementById('fileTwoInput')
//       );
//       const fileThreeInput = <HTMLInputElement>(
//         document.getElementById('fileThreeInput')
//       );

//       if (fileOneInput && fileOneInput.files && fileOneInput.files[0]) {
//         formData.append('fileOne', fileOneInput.files[0]);
//       }
//       if (fileTwoInput && fileTwoInput.files && fileTwoInput.files[0]) {
//         formData.append('fileTwo', fileTwoInput.files[0]);
//       }
//       if (fileThreeInput && fileThreeInput.files && fileThreeInput.files[0]) {
//         formData.append('fileThree', fileThreeInput.files[0]);
//       }
//       this.department.SaveData(formData).subscribe((result) => {
//         this.router.navigate(['pages/equipment-data']);
//       });
//     } else {
//       // Update existing equipment data
//       const formData = new FormData();
//       const fileOneInput = <HTMLInputElement>(
//         document.getElementById('fileOneInput')
//       );
//       const fileTwoInput = <HTMLInputElement>(
//         document.getElementById('fileTwoInput')
//       );
//       const fileThreeInput = <HTMLInputElement>(
//         document.getElementById('fileThreeInput')
//       );

//       if (fileOneInput && fileOneInput.files && fileOneInput.files[0]) {
//         formData.append('fileOne', fileOneInput.files[0]);
//       }
//       if (fileTwoInput && fileTwoInput.files && fileTwoInput.files[0]) {
//         formData.append('fileTwo', fileTwoInput.files[0]);
//       }
//       if (fileThreeInput && fileThreeInput.files && fileThreeInput.files[0]) {
//         formData.append('fileThree', fileThreeInput.files[0]);
//       }

//       this.department.update(this.deptid, formData).subscribe((data) => {
//         this.isEdit = false;
//         this.router.navigate(['pages/equipment-data']);
//       });
//     }
//   }
// }

//Images are stored but fields payload showing [object Object] error
  SaveData() {
    this.submitted = true;
    if (this.addEquipment.valid) {
      if (!this.isEdit) {
        // Save new equipment data
        const formData = new FormData();
        const fileOneInput = <HTMLInputElement>(
          document.getElementById('fileOneInput')
        );
        const fileTwoInput = <HTMLInputElement>(
          document.getElementById('fileTwoInput')
        );
        const fileThreeInput = <HTMLInputElement>(
          document.getElementById('fileThreeInput')
        );

        if (fileOneInput && fileOneInput.files && fileOneInput.files[0]) {
          formData.append('fileOne', fileOneInput.files[0]);
        }
        if (fileTwoInput && fileTwoInput.files && fileTwoInput.files[0]) {
          formData.append('fileTwo', fileTwoInput.files[0]);
        }
        if (fileThreeInput && fileThreeInput.files && fileThreeInput.files[0]) {
          formData.append('fileThree', fileThreeInput.files[0]);
        }

        // Append other form fields to formData
        formData.append('equipmentPackage', this.addEquipment.value.equipmentPackage);
        formData.append('equipmentPower', this.addEquipment.value.equipmentPower);
        formData.append('equipmentLabel', this.addEquipment.value.equipmentLabel);

        this.department.SaveData(formData).subscribe((result) => {
          this.router.navigate(['pages/equipment-data']);
        });
      } else {
        // Update existing equipment data
        const formData = new FormData();
        const fileOneInput = <HTMLInputElement>(
          document.getElementById('fileOneInput')
        );
        const fileTwoInput = <HTMLInputElement>(
          document.getElementById('fileTwoInput')
        );
        const fileThreeInput = <HTMLInputElement>(
          document.getElementById('fileThreeInput')
        );

        if (fileOneInput && fileOneInput.files && fileOneInput.files[0]) {
          formData.append('fileOne', fileOneInput.files[0]);
        }
        if (fileTwoInput && fileTwoInput.files && fileTwoInput.files[0]) {
          formData.append('fileTwo', fileTwoInput.files[0]);
        }
        if (fileThreeInput && fileThreeInput.files && fileThreeInput.files[0]) {
          formData.append('fileThree', fileThreeInput.files[0]);
        }

        // Append other form fields to formData
        formData.append('equipmentPackage', this.addEquipment.value.equipmentPackage);
        formData.append('equipmentPower', this.addEquipment.value.equipmentPower);
        formData.append('equipmentLabel', this.addEquipment.value.equipmentLabel);

        this.department.update(this.deptid, formData).subscribe((data) => {
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


