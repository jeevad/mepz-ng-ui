import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { RoomService } from 'src/app/service/room/room.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css'],
})
export class RoomDetailComponent implements OnInit {
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  roomData: any[] = [];

  constructor(private room: RoomService, private http: HttpClient) {
    this.Load();
  }

  ngOnInit() {
    this.Load();
    this.loadRoomData();
  }

  // Load room data from the server
  loadRoomData(): void {
    this.room.Load(0, 10).subscribe((data: any) => {
      this.roomData = data.results;
      console.log(data.results);
    });
  }

  // Load rooms based on pagination settings
  Load() {
    this.skip = this.limit * (this.page - 1);
    this.room.Load(this.skip, this.limit).subscribe((data: any) => {
      this.roomData = data.results;
      this.count = data.count;
    });
  }

  // Delete room by ID
  delete(id: any) {
    if (confirm('Delete?')) {
      this.room.Removedata(id).subscribe((data) => {
        this.Load();
      });
    }
  }
}
