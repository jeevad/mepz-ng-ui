import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EquipmentService } from 'src/app/service/equipment/equipment.service';
import { RoomService } from 'src/app/service/room/room.service';
import { EquipmentAllocationModalComponent } from '../equipment-allocation-modal/equipment-allocation-modal.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-rooms',
  templateUrl: './view-rooms.component.html',
  styleUrls: ['./view-rooms.component.css'],
})
export class ViewRoomsComponent {
  roomData: any[] = [];
  selectedQuantity: number = 0;
  item: any[] = [];
  selectOptions: any[] = [];
  projectRooms: any;
  projectEquipments: any[] = [];
  equipmentData: any[] = [];
  projectId: any;
  deptId!: any;
  roomId!: any;
  searchText: string = ''; // For search bar
  filteredRoomData: any[] = []; // For search bar
  project: any;
  department: any;

  constructor(
    private room: RoomService,
    private equipmentService: EquipmentService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
  ) {

    // For Qty dropdown: Creating options from 1 to 20
    for (let i = 1; i <= 20; i++) {
      this.selectOptions.push({ value: i.toString(), label: i.toString() });
    }
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.paramMap.get('projectId');
    this.deptId = this.route.snapshot.paramMap.get('deptId');
    this.loadRoomData();
    this.loadProjectRooms();
  }

  openEquipmentAllocationModal(roomId: string) {
    const modalRef = this.modalService.open(EquipmentAllocationModalComponent, { size: 'xl' });
    modalRef.componentInstance.projectId = this.projectId;
    modalRef.componentInstance.deptId = this.deptId;
    modalRef.componentInstance.roomId = roomId;
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
            alias: this.roomData[i].name,
          };
          console.log('roomData:', roomDataObject);
          this.room.saveRoomData(this.projectId, this.deptId, roomDataObject).subscribe((response: any) => {
            console.log('Data saved successfully:', response);

            this.projectRooms.push(roomDataObject);
            this.loadProjectRooms(); //real-time listing
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

  //Search Bar function
  searchRoomList(): void {
    if (this.searchText.trim() !== '') {
      this.filteredRoomData = this.projectRooms.filter((room: any) =>
        room.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        room.code.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredRoomData = this.projectRooms.slice();
    }
  }

  // Function to load room list
  loadProjectRooms(): void {
    this.room.getProjectRooms(this.projectId, this.deptId).subscribe((data: any) => {
      this.project = data.results[0];
      this.department = data.results[0].departments;
      this.projectRooms = data.results[0].departments.rooms;
      this.filteredRoomData = this.projectRooms.slice(); //For search bar
    });
  }

}
