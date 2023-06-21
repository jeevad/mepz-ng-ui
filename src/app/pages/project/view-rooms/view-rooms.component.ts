import { Component } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { EquipmentService } from 'src/app/service/equipment/equipment.service';
import { RoomService } from 'src/app/service/room/room.service';
import { EquipmentAllocationModalComponent } from '../equipment-allocation-modal/equipment-allocation-modal.component';
import { ActivatedRoute } from '@angular/router';
import { RoomSelectionModalComponent } from './room-selection-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-rooms',
  templateUrl: './view-rooms.component.html',
  styleUrls: ['./view-rooms.component.css'],
})
export class ViewRoomsComponent {
  public roomData: any[] = [];
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
  selectedRooms: string[] = [];  //For Disable/Enable
  selectAllRoomsCheckbox: boolean = false; //for selectAll
  isRoomSelected: boolean = false;

  constructor(
    private room: RoomService,
    private equipmentService: EquipmentService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router
  ) {

    // For Quantity dropdown: Creating options from 1 to 20
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
    modalRef.componentInstance.projectRooms = this.projectRooms;
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
      this.projectRooms.forEach((room: any) => {
        room.enabled = true;
      });
      this.filteredRoomData = this.projectRooms.slice();
    });
  }

  // Check if the room is selected | for enable/disable button
  isSelectedRoom(roomId: string): boolean {
    return this.selectedRooms.includes(roomId);
  }

  // Toggle the selection of a room | for enable/disable button
  toggleRoomSelection(event: Event, roomId: string): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedRooms.push(roomId);
    } else {
      this.selectedRooms = this.selectedRooms.filter((id: string) => id !== roomId);
    }
  }

  // Toggle the status of selected rooms | for enable/disable button
  toggleSelectedRoomStatus(): void {
    if (this.selectedRooms.length === 0) {
      this.openRoomSelectionModal();
      return;
    }
    for (const roomId of this.selectedRooms) {
      const room = this.filteredRoomData.find((r: any) => r._id === roomId);
      if (room) {
        const confirmationMessage = room.enabled ? 'Confirm disable?' : 'Confirm enable?';
        const confirmation = confirm(confirmationMessage);
        if (confirmation) {
          room.enabled = !room.enabled;
        }
      }
    }
    this.selectedRooms = [];
  }

  // Toggle the status of a single room | for enable/disable button
  toggleRoomStatus(roomId: string, currentStatus: boolean): void {
    if (!this.isSelectedRoom(roomId)) {
      this.openRoomSelectionModal();
      return;
    }
    const room = this.projectRooms.find((room: any) => room._id === roomId);
    if (room) {
      let confirmationMessage: string;
      if (currentStatus) {
        confirmationMessage = 'Confirm disable?';
      } else {
        confirmationMessage = 'Confirm enable?';
      }
      const confirmation = confirm(confirmationMessage);
      if (confirmation) {
        room.enabled = !room.enabled;
      }
    }
  }

  //Modal for Enable/Disable button
  openRoomSelectionModal() {
    const modalRef = this.modalService.open(RoomSelectionModalComponent, { centered: true, backdrop: 'static', keyboard: false });
    modalRef.componentInstance.errorMessage = 'Please select a room!';
  }

  // Select all rooms | for select/deselect checkbox
  selectAllRooms(): void {
    this.selectedRooms = this.projectRooms.map((room: any) => room._id);
  }

  // Deselect all rooms | for select/deselect checkbox
  deselectAllRooms(): void {
    this.selectedRooms = [];
  }

  // Function to check if all rooms are selected | for select/deselect checkbox
  areAllRoomsSelected(): boolean {
    return this.selectedRooms.length === this.projectRooms.length;
  }

  // Toggle selection for a room | for select/deselect checkbox
  toggleSelectionForRoom(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectAllRooms();
    } else {
      this.deselectAllRooms();
    }
  }

  // Back button
  goBack() {
    this.router.navigate(['pages/projects', this.projectId, 'department-transaction']);
  }

}



