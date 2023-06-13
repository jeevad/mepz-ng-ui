import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from 'src/app/service/department/department.service';
import { EquipmentService } from 'src/app/service/equipment/equipment.service';
import { ProjecttemplateService } from 'src/app/service/projecttemplate/projecttemplate.service';
import { RoomService } from 'src/app/service/room/room.service';

@Component({
  selector: 'app-project-template-equipment',
  templateUrl: './project-template-equipment.component.html',
  styleUrls: ['./project-template-equipment.component.css']
})
export class ProjectTemplateEquipmentComponent {
//Project-newtemplate
departmentdata: any;
active: any = ['Active', 'Inactive'];
message = '';
messageclass = '';
error: boolean = false;
isEdit: boolean = false;
deptid: any;
roomId: any;
editdata: any;
submitted: boolean = false;
addDepartment!: FormGroup;
//Department
item: any[] = [];
departmentData: any[] = [];
selectedDepartments: any[] = [];
page = 1;
limit = 10;
skip = 0;
count: number = 0;
projectId:any;
selectedDepartmentsRooms: any;
//Rooms
roomData: any[] = [];
selectedQuantity: number = 0;
selectOptions: any[] = [];
projectRooms: any[] = [];
projectEquipments: any[] = [];
equipmentData: any[] = []; //Equipment data list in sidebar

constructor(
  private department: ProjecttemplateService,
  private departmentService: DepartmentService,
  private room: RoomService,
  private equipmentService: EquipmentService,
  private http: HttpClient,
  private router: Router,
  private route: ActivatedRoute,
  private formBuilder: FormBuilder
) {
  // this.loadSelectedDepartments();
  // this.loadDepartmentData();
  this.loadRoomData(); // Loading room data
  this.loadSelectedRooms();
  this.loadEquipmentData(); //Equipment data list in sidebar
  this.loadProjectEquipments();
}

ngOnInit(): void {
  this.projectId = this.route.snapshot.paramMap.get('projectId');
  this.loadDepartmentData();
  this.loadSelectedDepartments();
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
    name: [''],
    noOfBeds: [''],
    remarks: [''],
    classification: [''],
    type: [''],
  });

  // let table = $('#example').DataTable({
  //   drawCallback: () => {
  //     $('.paginate_button.next').on('click', () => {
  //       this.nextButtonClickEvent();
  //     });
  //   },
  // });

  let table1 = $('#example1').DataTable({
    drawCallback: () => {
      $('.paginate_button.next').on('click', () => {
        this.nextButtonClickEvent();
      });
    },
  });

  let table2 = $('#example2').DataTable({
    drawCallback: () => {
      $('.paginate_button.next').on('click', () => {
        this.nextButtonClickEvent();
      });
    },
  });

  let table3 = $('#example3').DataTable({
    drawCallback: () => {
      $('.paginate_button.next').on('click', () => {
        this.nextButtonClickEvent();
      });
    },
  });
}


wholeRowClick(): void {}

nextButtonClickEvent(): void {}
previousButtonClickEvent(): void {}

classifications = [
  { value: 'CHI', label: 'CHILDRENS HOSPITAL' },
  { value: 'DEPARTMENT', label: 'MEDICAL EQUIPMENT PLANNING' },
  { value: 'GEN', label: 'GENERAL HOSPITAL' },
  { value: 'KK0001', label: 'KLINIK KESIHATAN 2' },
  { value: 'SPEC', label: 'SPECIALIZED HOSPITAL' },
];

projecttypes = [
  { value: 'GOV', label: 'GOVERNMENT' },
  { value: 'SEC', label: 'PRIVATE' },
];

SaveData() {
  if (!this.isEdit) {
    this.submitted = true;
    if (this.addDepartment.valid) {
      this.department
        .SaveData(this.addDepartment.value)
        .subscribe((result) => {
          this.router.navigate(['pages/project-template']);
        });
    }
  } else if (this.isEdit) {
    this.submitted = true;
    if (this.addDepartment.valid) {
      this.department
        .update(this.deptid, this.addDepartment.value)
        .subscribe((data) => {
          this.isEdit = false;
          this.router.navigate(['pages/project-template']);
        });
    }
  }
}

  // Add selected departments
  addDepartments(): void {
    const selectedItems = this.departmentData.filter((item) => item.selected);

    const departmentData = {
      departments: selectedItems.map((item) => ({
        name: item.name,
        code: item.code,
      })),
    };

    this.departmentService.saveDepartments(this.projectId, departmentData).subscribe({

      next: (response) => {
        console.log('Departments saved successfully', response);
        this.loadSelectedDepartments();
        this.loadDepartmentData();
      },
      error: (error) => {
        console.error('Failed to save departments', error);
      },
    });
  }

  // Load department data from the service  | Sidebar
  loadDepartmentData(): void {
    this.departmentService.Load(0, 10).subscribe((data: any) => {
      this.departmentData = data.results;
    });
  }

  // Load selected departments List
  loadSelectedDepartments(): void {
    this.skip = this.limit * (this.page - 1);
    this.departmentService
      .getProjectDepartments(this.projectId,this.skip, this.limit)
      .subscribe((data: any) => {
        this.selectedDepartments = data.departments;
        this.count = data.count;
        console.log(this.selectedDepartments[0].rooms);
      });
  }

  // Toggle selection of a department
  toggleSelection(index: number): void {
    this.departmentData[index].selected = !this.departmentData[index].selected;
  }

  // Event handler for button click within a row
  buttonInRowClick(event: any): void {
    event.stopPropagation();
  }

   // Load equipment data from the service  | List in Sidebar
loadEquipmentData(): void {
  this.equipmentService.Load(0, 10).subscribe((data: any) => {
    this.equipmentData = data.results;
  });
}

// Function to save room data
saveRoomData(): void {
  console.log('Save data method called');
  for (let i = 0; i < this.roomData.length; i++) {
    const selectedQuantity = this.roomData[i].selectedQuantity;
    if (selectedQuantity > 0) {
      for (let j = 0; j < selectedQuantity; j++) {
        const roomDataObject = {
          name: this.roomData[i].name,
          code: this.roomData[i].code,
        };
        console.log('roomData:', roomDataObject);
        this.room.saveRoomData(this.projectId, this.deptid,  roomDataObject).subscribe((response: any) => {
          console.log('Data saved successfully:', response);
        });
      }
    }
  }
}

// Function to save equipment data
saveEquipmentData(): void {
  console.log('Save data method called');

  for (let i = 0; i < this.projectEquipments.length; i++) {
    const roomDataObject1 = {
      name: this.projectEquipments[i].name,
    };
    console.log('equipmentData:', roomDataObject1);
    this.room
      .saveEquipmentData(this.projectId, this.deptid, this.roomId, roomDataObject1) // Add the roomId argument
      .subscribe((response: any) => {
        console.log('Data saved successfully:', response);
      });
  }
  // Clear the selected equipment array
  this.projectEquipments = [];
}


// // Function to add the selected equipment to the array | SAVED MANY TIMES BASED ON CLICKING
// selectEquipment(item: any): void {
//   this.projectEquipments.push(item);
// }

// Function to add selected equipment to the array | SAVED ONLY ONE TIME
selectEquipment(item: any): void {
  const isItemSelected = this.projectEquipments.includes(item);
  if (!isItemSelected) {
    this.projectEquipments.push(item);
  }
}

// Function to load room list
loadSelectedRooms(): void {
  this.room.getProjectRooms(this.projectId, this.deptid).subscribe((data: any) => {
    this.projectRooms = data.rooms;
  });
}

// Function to load equipment list
loadProjectEquipments(): void {
  this.room.getProjectEquipments(this.projectId, this.deptid, this.roomId).subscribe((data: any) => {
    this.projectEquipments = data.equipments;
  });
}

// Function to load room data
loadRoomData(): void {
  this.room.Load(0, 10).subscribe((data: any) => {
    this.roomData = data.results;
    console.log(data.results);
  });
}
change(e: any) {
  this.active = e.target.value;
}
}
