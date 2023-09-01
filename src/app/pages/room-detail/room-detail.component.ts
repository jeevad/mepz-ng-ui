import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { RoomService } from 'src/app/service/room/room.service';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MyCustomDialogService } from 'src/app/components/my-custom-dialog/my-custom-dialog.service';

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
  loader: boolean = false;
  maxSize: number = 5;

  constructor(private room: RoomService, private http: HttpClient, private customDialog: MyCustomDialogService, private breakpointObserver: BreakpointObserver) {
    this.Load();
  }

  ngOnInit() {
    this.Load();
    this.loadRoomData();
    this.reponsivePagination();
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

  // Load room data from the server
  loadRoomData(): void {
    this.loader = true;
    this.room.Load(0, 10).subscribe((data: any) => {
      this.roomData = data.results;
      this.loader = false;
    });
  }

  // Load rooms based on pagination settings
  Load() {
    this.loader = true;
    this.skip = this.limit * (this.page - 1);
    this.room.Load(this.skip, this.limit).subscribe((data: any) => {
      this.roomData = data.results;
      this.count = data.count;
      this.loader = false;
    });
  }

  // Delete room by ID
  delete(id: any) {
    const dialogRef = this.customDialog.openConfirmDialog({
      dialogMsg: 'Are you sure want to delete?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.room.Removedata(id).subscribe((data) => {
          this.Load();
        });
      }
    });
  }
}
