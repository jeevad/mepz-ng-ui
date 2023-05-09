import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/service/room/room.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css'],
})
export class AddRoomComponent implements OnInit {
  roomData: any;
  active: any = ['Active', 'Inactive'];
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
    this.roomid = this.route.snapshot.paramMap.get('id');

    this.route.params.subscribe((param) => {
      if (param && param['id']) {
        this.room.LoadbyID(param['id']).subscribe((resp) => {
          this.isEdit = true;
          this.addRoom.patchValue(resp);
        });
      }
    });
    this.addRoom = this.formBuilder.group({
      roomcode: ['', Validators.required],
      roomname: ['', Validators.required],
      active: [''],
    });
  }
  SaveData() {
    if (!this.isEdit) {
      this.submitted = true;
      if (this.addRoom.valid) {
        this.room.SaveData(this.addRoom.value).subscribe((result) => {
          this.router.navigate(['/room-detail']);
        });
      }
    } else if (this.isEdit) {
      this.submitted = true;
      if (this.addRoom.valid) {
        this.room.update(this.roomid, this.addRoom.value).subscribe((data) => {
          this.isEdit = false;
          this.router.navigate(['/room-detail']);
        });
      }
    }
  }

  change(e: any) {
    this.active?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
}
