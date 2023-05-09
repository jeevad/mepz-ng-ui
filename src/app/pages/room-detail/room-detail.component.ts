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
  }
  Load() {
    this.skip = this.limit * (this.page - 1);
    this.room.Load(this.skip, this.limit).subscribe((data: any) => {
      this.roomData = data.results;
      this.count = data.count;
    });
  }
  delete(id: any) {
    if (confirm('delete?')) {
      this.room.Removedata(id).subscribe((data) => {
        this.Load();
      });
    }
  }
}
