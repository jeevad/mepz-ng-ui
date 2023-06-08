import { Component } from '@angular/core';
import { EquipmentService } from 'src/app/service/equipment/equipment.service';
import { RoomService } from 'src/app/service/room/room.service';

@Component({
  selector: 'app-view-rooms',
  templateUrl: './view-rooms.component.html',
  styleUrls: ['./view-rooms.component.css'],
})
export class ViewRoomsComponent {
  roomData: any[] = [];
  selectedQuantity: number = 0;
  selectedQuantity1: number = 0;
  item: any[] = [];
  selectOptions: any[] = [];
  selectedRooms: any[] = [];
  selectedEquipments: any[] = [];
  equipmentdata: any[] = []; //Equipment data list in sidebar
  selectedEquipment: any[] = [];

  constructor(
    private room: RoomService,
    private equipmentService: EquipmentService
  ) {
    // For Qty dropdown: Creating options from 1 to 20
    for (let i = 1; i <= 20; i++) {
      this.selectOptions.push({ value: i.toString(), label: i.toString() });
    }
  }

  ngOnInit() {
    // Initializing DataTables and setting up callbacks
    let table = $('#example').DataTable({
      drawCallback: () => {
        $('.paginate_button.next').on('click', () => {
          this.nextButtonClickEvent();
        });
      },
    });

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

    this.loadRoomData(); // Loading room data
    this.loadSelectedRooms();
    this.loadEquipmentData(); //Equipment data list in sidebar
    this.loadSelectedEquipments();
  }

  // Load equipment data from the service  | List in Sidebar
  loadEquipmentData(): void {
    this.equipmentService.Load(0, 10).subscribe((data: any) => {
      this.equipmentdata = data.results;
    });
  }
  // Event handler for button click in a row
  buttonInRowClick(event: any): void {
    event.stopPropagation();
    console.log('Button in the row clicked.');
  }

  // Event handler for whole row click
  wholeRowClick(): void {
    console.log('Whole row clicked.');
  }

  // Event handler for next button click
  nextButtonClickEvent(): void {
    console.log('Next clicked');
  }

  // Event handler for previous button click
  previousButtonClickEvent(): void {}

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
          this.room.saveRoomData(roomDataObject).subscribe((response: any) => {
            console.log('Data saved successfully:', response);
          });
        }
      }
    }
  }

  // Function to save equipment data
  saveEquipmentData(): void {
    console.log('Save data method called');

    for (let i = 0; i < this.selectedEquipment.length; i++) {
      const roomDataObject1 = {
        name: this.selectedEquipment[i].name,
      };
      console.log('equipmentdata:', roomDataObject1);
      this.room
        .saveEquipmentData(roomDataObject1)
        .subscribe((response: any) => {
          console.log('Data saved successfully:', response);
        });
    }
    // Clear the selected equipment array
    this.selectedEquipment = [];
  }

  // // Function to add the selected equipment to the array | SAVED MANY TIMES BASED ON CLICKING
  // selectEquipment(item: any): void {
  //   this.selectedEquipment.push(item);
  // }

  // Function to add selected equipment to the array | SAVED ONLY ONE TIME
  selectEquipment(item: any): void {
    const isItemSelected = this.selectedEquipment.includes(item);
    if (!isItemSelected) {
      this.selectedEquipment.push(item);
    }
  }

  // Function to load room list
  loadSelectedRooms(): void {
    this.room.getSelectedRooms().subscribe((data: any) => {
      this.selectedRooms = data.rooms;
    });
  }

  // Function to load equipment list
  loadSelectedEquipments(): void {
    this.room.getSelectedEquipments().subscribe((data: any) => {
      this.selectedEquipments = data.equipments;
    });
  }

  // Function to load room data
  loadRoomData(): void {
    this.room.Load(0, 10).subscribe((data: any) => {
      this.roomData = data.results;
      console.log(data.results);
    });
  }
}
