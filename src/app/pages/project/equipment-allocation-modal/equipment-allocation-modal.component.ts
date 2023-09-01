import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbActiveModal,
  NgbModal,
  NgbModule,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';
import { RoomService } from 'src/app/service/room/room.service';
import { EquipmentService } from 'src/app/service/equipment/equipment.service';
import { FormsModule } from '@angular/forms';
import { ProjectService } from 'src/app/service/project/project.service';
import { filter } from 'rxjs';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-equipment-allocation-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgbNavModule,
    NgbModule,
    LoaderComponent,
  ],
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
  loader: boolean = false;
  otherProjectId: string[] = [];
  otherDepartmentId: any = '';
  otherRoomId: any = '';
  searchInput: any = '';
  otherEquipmentData: any[] = [];
  isAlertVisible: boolean = false;
  alertMessage: any;
  masterEquipmentCount: number = 0;
  masterEquipmentPage: number = 1;
  limit: number = 50;
  projectEquipmentsCount: number = 0;
  projectEquipmentsPage: number = 1;
  maxSize: number = 5;

  constructor(
    private room: RoomService,
    private projectService: ProjectService,
    private equipmentService: EquipmentService,
    public activeModal: NgbActiveModal,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.getCurrentProjectRooms();
    this.loadProjectData(); //dependent dropdown
    // this.loadEquipmentData();
    this.loadProjectEquipments();
    this.loadMasterEquipmentData();
    this.reponsivePagination();
    // const selectedRoom = this.projectRooms.filter(
    //   (x) => (x.roomId = this.roomId)
    // );
    this.globalRoomId = this.roomId;
    // this.globalProjectRoom = this.projectRooms;
  }

  reponsivePagination(){
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe(result => {
      if (result.matches) {
        this.maxSize = 1;
      } else {
        this.maxSize = 5;
      }
    });
  }

  getCurrentProjectRooms() {
    this.loader = true;
    const filterEquipmentDto: any = { projectId: [this.projectId] };
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
    this.loader = true;
    // const skip = this.limit * (this.masterEquipmentPage - 1);
    console.log('this.masterEquipmentPage', this.masterEquipmentPage);

    this.projectService.Load(0, 0, this.projectType).subscribe((data: any) => {
      this.projectData = data.results;
      this.loader = false;
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
    console.log('item', item);

    if (isItemSelected) {
      const index = this.projectEquipment.indexOf(item);
      this.projectEquipment.splice(index, 1);
    } else {
      this.projectEquipment.push(item);
    }
  }

  // Function to save equipment data
  saveEquipmentData(): void {
    for (const eqp of this.projectEquipment) {
      // for (let i = 0; i < this.projectEquipment.length; i++) {
      // this.projectEquipment
      if (this.activeTab === 1) {
        eqp.masterId = eqp._id;
      }
      delete eqp._id;
      let equipLength = [];
      this.room
        .saveEquipmentData(this.projectId, this.deptId, this.roomId, eqp)
        .subscribe((response: any) => {
          this.projectEquipments.push(eqp);
        });
    }
    if (this.projectEquipment.length === 1) {
      this.alertMessage =
        this.projectEquipment.length + ' Item added to the project';
      this.isAlertVisible = true;
      setTimeout(() => {
        this.isAlertVisible = false;
      }, 3000);
    } else if (this.projectEquipment.length > 1) {
      this.alertMessage =
        this.projectEquipment.length + ' Items added to the project';
      this.isAlertVisible = true;
      setTimeout(() => {
        this.isAlertVisible = false;
      }, 3000);
    } else {
      this.alertMessage = '';
    }
    this.projectEquipment = []; // Clear the projectEquipment array
  }

  //Search Bar function
  searchEquipment(): void {
    this.loader = true;
    if (this.searchText.trim() !== '') {
      this.masterEquipmentList = this.equipmentData.filter(
        (item: any) =>
          item.name.toLowerCase().includes(this.searchText.toLowerCase()) |
          item.code.toLowerCase().includes(this.searchText.toLowerCase())
      );
      this.loader = false;
    } else {
      this.masterEquipmentList = this.equipmentData.slice();
      this.loader = false;
    }
  }

  //Search Bar function | for master equipments
  searchMasterEquipment(): void {
    this.loader = true;
    if (this.searchText.trim() !== '') {
      this.masterEquipmentList = this.equipmentData.filter(
        (item: any) =>
          item.name.toLowerCase().includes(this.searchText.toLowerCase()) |
          item.code.toLowerCase().includes(this.searchText.toLowerCase())
      );
      this.loader = false;
    } else {
      this.masterEquipmentList = this.equipmentData.slice();
      this.loader = false;
    }
  }

  // Load equipment data from the service  | List in Sidebar
  loadMasterEquipmentData(): void {
    this.loader = true;
    const skip = this.limit * (this.masterEquipmentPage - 1);
    this.equipmentService.Load(skip, this.limit).subscribe((data: any) => {
      this.equipmentData = data.results;
      this.masterEquipmentList = this.equipmentData;
      this.masterEquipmentCount = data.count;
      this.loader = false;
    });
  }

  // Function to load equipment list
  loadProjectEquipments(): void {
    this.loader = true;
    this.projectService
      .getProjectEquipments(this.projectId, this.deptId, this.roomId)
      .subscribe((data: any) => {
        this.projectEquipments = data.results;
        this.projectEquipmentsCount = data.count;
        this.loader = false;
        this.project = data.results[0];
        this.department = data.results[0].department;
      });
  }

  searchOtherProjectEqp() {
    const filterEquipmentDto: any = {
      projectId: this.otherProjectId,
      departmentId: this.otherDepartmentId,
      roomId: this.otherRoomId,
      searchInput: this.searchInput,
      skip: 0,
      limit: 10,
    };
    this.loader = true;
    this.projectService
      .getAllEquipments(filterEquipmentDto)
      .subscribe((data: any) => {
        this.otherEquipmentData = data.results;
        // this.count = data.results[0].metadata[0].total;
        // this.filteredEquipmentData = this.equipmentData.slice(); //For search bar
        this.loader = false;
      });
  }
}
