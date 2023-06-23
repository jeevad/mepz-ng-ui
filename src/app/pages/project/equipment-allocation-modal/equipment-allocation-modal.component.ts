import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbActiveModal,
  NgbModal,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';
import { RoomService } from 'src/app/service/room/room.service';
import { EquipmentService } from 'src/app/service/equipment/equipment.service';
import { FormsModule } from '@angular/forms';
import { ProjectService } from 'src/app/service/project/project.service';
import { filter } from 'rxjs';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

@Component({
  selector: 'app-equipment-allocation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbNavModule, LoaderComponent],
  // declarations: [LoaderComponent],
  templateUrl: './equipment-allocation-modal.component.html',
  styleUrls: ['./equipment-allocation-modal.component.css'],
})
export class EquipmentAllocationModalComponent {
  @Input() name: any;
  @Input() projectId!: string;
  @Input() deptId!: any;
  @Input() roomId!: any;
  @Input() projectType!: any;

  projectRooms: any[] = [];

  activeTab = 1;
  roomData: any[] = [];
  selectedQuantity: number = 0;
  item: any[] = [];
  selectedRooms: any[] = [];
  projectEquipments: any[] = [];
  equipmentData: any[] = [];
  projectEquipment: any[] = [];
  searchText: string = '';
  filteredEquipmentData: any[] = [];
  masterEquipmentList: any[] = [];
  projectData: any[] = [];
  projectDepartments: any[] = [];
  globalRoomId: any;
  selectedRoomId: string = '';
  project: any;
  department: any;
  globalProjectRoom: any[] = [];
  loader = true;
  otherProjectId: string[] = [];
  otherDepartmentId: any = '';
  otherRoomId: any = '';
  searchInput: any = '';
  otherEquipmentData: any[] = [];

  constructor(
    private room: RoomService,
    private projectService: ProjectService,
    private equipmentService: EquipmentService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.getCurrentProjectRooms();
    this.loadProjectData(); //dependent dropdown
    // this.loadEquipmentData();
    this.loadProjectEquipments();
    this.loadMasterEquipmentData();
    // const selectedRoom = this.projectRooms.filter(
    //   (x) => (x.roomId = this.roomId)
    // );
    this.globalRoomId = this.roomId;
    // this.globalProjectRoom = this.projectRooms;
  }

  getCurrentProjectRooms() {
    const filterEquipmentDto: any = {
      projectId: [this.projectId],
    };
    this.projectService
      .getAllRooms(0, 10, filterEquipmentDto)
      .subscribe((data: any) => {
        this.globalProjectRoom = data.results[0].data;
        // this.count = data.results[0].metadata[0].total;
        // this.projectRooms = this.equipmentData.slice(); //For search bar
        this.loader = false;
      });
  }
  //Project list in equipment modal
  loadProjectData() {
    this.projectService.Load(0, 10, this.projectType).subscribe((data: any) => {
      this.projectData = data.results;
      if (this.projectId) {
        const selectedProject = this.projectData.find(
          (project: any) => project.code === this.projectId
        );
        if (selectedProject) {
          this.projectDepartments = selectedProject.departments;
        }
      }
    });
  }

  //For Selected project's department list
  onProjectChange(event: any): void {
    const filterEquipmentDto: any = {
      projectId: this.otherProjectId,
    };
    this.projectService
      .getAllRooms(0, 10, filterEquipmentDto)
      .subscribe((data: any) => {
        this.projectRooms = data.results[0].data;
        // this.count = data.results[0].metadata[0].total;
        // this.projectRooms = this.equipmentData.slice(); //For search bar
        this.loader = false;
      });
  }

  // For Selected room's equipment list
  onRoomChange(event: any, roomId: string): void {
    this.selectedRoomId = event.target.value;
    this.roomId = event.target.value;
    this.loadProjectEquipments();
  }

  // Function for checkbox
  selectEquipment(item: any): void {
    const isItemSelected = this.projectEquipment.includes(item);

    if (isItemSelected) {
      const index = this.projectEquipment.indexOf(item);
      this.projectEquipment.splice(index, 1);
    } else {
      this.projectEquipment.push(item);
    }
  }

  // Function to save equipment data
  saveEquipmentData(): void {
    for (let i = 0; i < this.projectEquipment.length; i++) {
      const roomDataObject = {
        equipmentId: this.projectEquipment[i]._id,
        name: this.projectEquipment[i].name,
        code: this.projectEquipment[i].code,
      };
      console.log('equipmentData:', roomDataObject);
      this.room
        .saveEquipmentData(
          this.projectId,
          this.deptId,
          this.roomId,
          roomDataObject
        )
        .subscribe((response: any) => {
          console.log('Data saved successfully:', response);
          this.projectEquipments.push(roomDataObject);
        });
    }

    this.projectEquipment = []; // Clear the projectEquipment array
  }

  //Search Bar function
  searchEquipment(): void {
    if (this.searchText.trim() !== '') {
      this.masterEquipmentList = this.equipmentData.filter(
        (item: any) =>
          item.name.toLowerCase().includes(this.searchText.toLowerCase()) |
          item.code.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.masterEquipmentList = this.equipmentData.slice();
    }
  }

  //Search Bar function | for master equipments
  searchMasterEquipment(): void {
    if (this.searchText.trim() !== '') {
      this.masterEquipmentList = this.equipmentData.filter(
        (item: any) =>
          item.name.toLowerCase().includes(this.searchText.toLowerCase()) |
          item.code.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.masterEquipmentList = this.equipmentData.slice();
    }
  }

  // Load equipment data from the service  | List in Sidebar
  loadMasterEquipmentData(): void {
    this.equipmentService.Load(0, 10).subscribe((data: any) => {
      this.equipmentData = data.results;
      this.masterEquipmentList = this.equipmentData.slice();
    });
  }

  // Function to load equipment list
  loadProjectEquipments(): void {
    this.room
      .getProjectEquipments(this.projectId, this.deptId, this.roomId)
      .subscribe((data: any) => {
        this.projectEquipments = data.results[0].departments.rooms.equipments;
        this.project = data.results[0];
        this.department = data.results[0].departments;
      });
  }

  searchOtherProjectEqp() {
    const filterEquipmentDto: any = {
      projectId: this.otherProjectId,
      departmentepartmentId: this.otherDepartmentId,
      roomId: this.otherRoomId,
      searchInput: this.searchInput,
    };
    // this.otherProjectId.forEach((element: any, i: number) => {
    //   filterEquipmentDto.projectId[i] = element;
    // });
    this.projectService
      .getAllEquipments(0, 10, filterEquipmentDto)
      .subscribe((data: any) => {
        this.otherEquipmentData = data.results[0].data;
        // this.count = data.results[0].metadata[0].total;
        // this.filteredEquipmentData = this.equipmentData.slice(); //For search bar
        this.loader = false;
      });
  }
}
