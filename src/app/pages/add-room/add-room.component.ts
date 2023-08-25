import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/service/room/room.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css'],
})
export class AddRoomComponent implements OnInit {
  roomData: any;
  active: boolean = false;
  message = '';
  messageclass = '';
  error: boolean = false;
  isEdit: boolean = false;
  roomid: any;
  editdata: any;
  submitted: boolean = false;
  addRoom!: FormGroup;

  constructor(
    private room: RoomService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Get room ID from the route parameter
    this.roomid = this.route.snapshot.paramMap.get('id');

    // Check if room ID exists in the route params for edit mode
    this.route.params.subscribe((param) => {
      if (param && param['id']) {
        // Load room data by ID for editing
        this.room.LoadbyID(param['id']).subscribe((resp) => {
          this.isEdit = true;
          this.addRoom.patchValue(resp);
        });
      }
    });

    // Initialize the form with form controls and validators
    this.addRoom = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      active: ['', Validators.required],
    });
  }

  // Save room data
  SaveData() {
    if (!this.isEdit) {
      this.submitted = true;
      if (this.addRoom.valid) {
        // Save new room data
        this.room.SaveData(this.addRoom.value).subscribe((result) => {
          this.router.navigate(['pages/room-detail']);
        });
      }
    } else if (this.isEdit) {
      this.submitted = true;
      if (this.addRoom.valid) {
        // Update existing room data
        this.room.update(this.roomid, this.addRoom.value).subscribe((data) => {
          this.isEdit = false;
          this.router.navigate(['pages/room-detail']);
        });
      }
    }
  }

  // Handle change event for the active dropdown
  change(e: any) {
    this.active = e.target.value === 'Active';
  }
}
