import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RoomService } from 'src/app/service/room/room.service';
import { EquipmentService } from 'src/app/service/equipment/equipment.service';
import { FormsModule } from '@angular/forms';
import { ProjectService } from 'src/app/service/project/project.service';

@Component({
  selector: 'app-equipment-allocation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbNavModule],
  templateUrl: './equipment-allocation-modal.component.html',
  styleUrls: ['./equipment-allocation-modal.component.css'],
})
export class EquipmentAllocationModalComponent {
  @Input() name: any;
  @Input() projectId!: any;
  @Input() deptId!: any;
  @Input() roomId!: any;

  activeTab = 1;
  roomData: any[] = [];
  selectedQuantity: number = 0;
  selectedQuantity1: number = 0;
  item: any[] = [];
  selectOptions: any[] = [];
  selectedRooms: any[] = [];
  selectedEquipments: any[] = [];
  equipmentdata: any[] = []; //Equipment data list in sidebar
  selectedEquipment: any[] = [];
  searchText: string = '';
  filteredEquipmentData: any[] = [];
  projectData: any[] = [];


  constructor(
    private room: RoomService,
    private projectService: ProjectService,
    private equipmentService: EquipmentService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {
    // For Qty dropdown: Creating options from 1 to 20
    for (let i = 1; i <= 20; i++) {
      this.selectOptions.push({ value: i.toString(), label: i.toString() });
    }
  }

  ngOnInit() {
    console.log('this.projectId,this.deptId, this.roomId', this.projectId, this.deptId, this.roomId);
    this.loadProjectData();


    // this.loadRoomData(); // Loading room data
    // this.loadSelectedRooms();
    this.loadEquipmentData(); //Equipment data list in sidebar
    this.loadSelectedEquipments();
  }

  openEquipmentAllocationModal() {
    const modalRef = this.modalService.open(EquipmentAllocationModalComponent);
    modalRef.componentInstance.name = 'World';
  }

  loadProjectData() {
    this.projectService.Load(0, 10).subscribe((data: any) => {
      this.projectData = data.results;
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
            roomId: this.roomData[i]._id,
            name: this.roomData[i].name,
            code: this.roomData[i].code,
          };
          console.log('roomData:', roomDataObject);
          this.room.saveRoomData(this.projectId, this.deptId, roomDataObject).subscribe((response: any) => {
            console.log('Data saved successfully:', response);

            this.selectedRooms.push(roomDataObject);
          });
        }
      }
    }
  }

  // Function to load room data
  loadRoomData(): void {
    this.room.Load(0, 10).subscribe((data: any) => {
      this.roomData = data.results;
      console.log(data.results);
    });
  }

  // Function to load room list
  loadSelectedRooms(): void {
    this.room.getSelectedRooms(this.projectId, this.deptId).subscribe((data: any) => {
      this.selectedRooms = data.rooms;
    });
  }

  // Function to save equipment data
  saveEquipmentData(): void {
    console.log('Save data method called');

    for (let i = 0; i < this.selectedEquipment.length; i++) {
      const roomDataObject1 = {
        equipmentId: this.selectedEquipment[i]._id,
        name: this.selectedEquipment[i].name,
        code: this.selectedEquipment[i].code,
      };
      console.log('equipmentdata:', roomDataObject1);
      this.room.saveEquipmentData(this.projectId, this.deptId, this.roomId, roomDataObject1).subscribe((response: any) => {
        console.log('Data saved successfully:', response);
        this.selectedEquipments.push(roomDataObject1);
         this.loadSelectedRooms(); //real-time listing
      });
    }
    this.selectedEquipment = []; // Clear the selected equipment array
  }

  // Function to add selected equipment to the array | SAVED ONLY ONE TIME
  selectEquipment(item: any): void {
    const isItemSelected = this.selectedEquipment.includes(item);
    if (!isItemSelected) {
      this.selectedEquipment.push(item);
    }
  }

  // Load equipment data from the service  | List in Sidebar
  loadEquipmentData(): void {
    this.equipmentService.Load(0, 10).subscribe((data: any) => {
      this.equipmentdata = data.results;
      this.filteredEquipmentData = this.equipmentdata.slice();
    });
  }

  // Function to load equipment list
  loadSelectedEquipments(): void {
    this.room.getSelectedEquipments(this.projectId, this.deptId, this.roomId).subscribe((data: any) => {
      this.selectedEquipments = data.results[0].departments.rooms.equipments;;
    });
  }

  //Search Bar function
  searchEquipment(): void {
    if (this.searchText.trim() !== '') {
      this.filteredEquipmentData = this.equipmentdata.filter((item: any) =>
        item.name.toLowerCase().includes(this.searchText.toLowerCase()) |
        item.code.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredEquipmentData = this.equipmentdata.slice();
    }
  }

  buttonInRowClick(event: any): void {
    event.stopPropagation();
    console.log('Button in the row clicked.');
  }

  wholeRowClick(): void {
    console.log('Whole row clicked.');
  }

  nextButtonClickEvent(): void {
    console.log('Next clicked');
  }

  previousButtonClickEvent(): void { }

}
