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
  item: any[] = [];
  selectOptions: any[] = [];
  selectedRooms: any[] = [];
  projectEquipments: any[] = [];
  equipmentData: any[] = []; //Equipment data list in sidebar
  projectEquipment: any[] = [];
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
    this.loadEquipmentData(); //Equipment data list in sidebar
    this.loadProjectEquipments();
  }

  //Project list in equipment modal
  loadProjectData() {
    this.projectService.Load(0, 10).subscribe((data: any) => {
      this.projectData = data.results;
    });
  }

  // Function to save equipment data
  saveEquipmentData(): void {
    for (let i = 0; i < this.projectEquipment.length; i++) {
      const roomDataObject1 = {
        equipmentId: this.projectEquipment[i]._id,
        name: this.projectEquipment[i].name,
        code: this.projectEquipment[i].code,
      };
      console.log('equipmentData:', roomDataObject1);
      this.room.saveEquipmentData(this.projectId, this.deptId, this.roomId, roomDataObject1).subscribe((response: any) => {
        console.log('Data saved successfully:', response);
        this.projectEquipments.push(roomDataObject1);
        //  this.loadSelectedRooms(); //real-time listing
      });
    }
    this.projectEquipment = []; // Clear the projectEquipments equipment array
  }

  // Function to add projectEquipments equipment to the array | SAVED ONLY ONE TIME
  selectEquipment(item: any): void {
    const isItemSelected = this.projectEquipment.includes(item);
    if (!isItemSelected) {
      this.projectEquipment.push(item);
    }
  }

  // Load equipment data from the service  | List in Sidebar
  loadEquipmentData(): void {
    this.equipmentService.Load(0, 10).subscribe((data: any) => {
      this.equipmentData = data.results;
      this.filteredEquipmentData = this.equipmentData.slice();
    });
  }

  // Function to load equipment list
  loadProjectEquipments(): void {
    this.room.getProjectEquipments(this.projectId, this.deptId, this.roomId).subscribe((data: any) => {
      this.projectEquipments = data.results[0].departments.rooms.equipments;;
    });
  }

  //Search Bar function
  searchEquipment(): void {
    if (this.searchText.trim() !== '') {
      this.filteredEquipmentData = this.equipmentData.filter((item: any) =>
        item.name.toLowerCase().includes(this.searchText.toLowerCase()) |
        item.code.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredEquipmentData = this.equipmentData.slice();
    }
  }
}
