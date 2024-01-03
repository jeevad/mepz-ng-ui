import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomService } from '@app/service/room/room.service';
import { ProjectService } from '@app/service/project/project.service';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from '@app/components/toaster/toaster.service';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '@app/components/loader/loader.component';

@Component({
  selector: 'app-add-room-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule, LoaderComponent],
  templateUrl: './add-room-modal.component.html',
  styleUrls: ['./add-room-modal.component.scss'],
})
export class AddRoomModalComponent {
  public roomData: any[] = [];
  item: any[] = [];
  selectOptions: any[] = [];
  loader: boolean = false;
  @Input() deptId!: any;
  @Input() projectId!: any;

  constructor(
    private room: RoomService,
    public toastService: ToasterService,
    public activeModal: NgbActiveModal
  ) {
    // For Quantity dropdown: Creating options from 1 to 20
    for (let i = 1; i <= 20; i++) {
      this.selectOptions.push({ value: i.toString(), label: i.toString() });
    }
  }

  ngOnInit() {
    this.loadRoomData();
  }

  // Function to save room data
  saveRoomData(): void {
    for (let i = 0; i < this.roomData.length; i++) {
      const selectedQuantity = this.roomData[i].selectedQuantity;
      console.log('selectedQuantity :- ', selectedQuantity);
      if (selectedQuantity && selectedQuantity > 0) {
        this.loader = true;
        for (let j = 0; j < selectedQuantity; j++) {
          const roomDataObject = {
            masterId: this.roomData[i]._id,
            name: this.roomData[i].name,
            code: this.roomData[i].code,
            alias: this.roomData[i].name,
          };
          this.room
            .saveRoomData(this.projectId, this.deptId, roomDataObject)
            .subscribe((response: any) => {
              // this.projectRooms.push(roomDataObject);
              // this.loadProjectRooms(); //real-time listing
              this.toastService.show(
                selectedQuantity +
                  ' ' +
                  this.roomData[i].name +
                  ` - ${selectedQuantity === '1' ? 'Room' : 'Rooms'} added`,
                {
                  classname: 'bg-success text-light',
                  delay: 10000,
                }
              );
            });
        }
        this.loader = false;
        this.activeModal.close('added');
      }
    }
  }

  // Function to load room data
  loadRoomData(): void {
    this.loader = true;
    this.room.Load(0, 10).subscribe((data: any) => {
      this.roomData = data.results;
      this.loader = false;
    });
  }
}
