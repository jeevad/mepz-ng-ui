import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
// import 'datatables.net';
// import 'datatables.net-responsive-bs5';
// import 'datatables.net-responsive';
import { RoomService } from 'src/app/service/room/room.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  roomData: any;
  constructor(private room: RoomService, private http: HttpClient) {
    this.Load();
  }
  Load() {
    this.room.Load().subscribe(data => {
      console.log(data);
      this.roomData = data;
    });
  }
  delete(id: any) {
    if (confirm('delete?')) {
      this.room.Removedata(id).subscribe(data => {
        this.Load();
      });
    }

  }

  ngOnInit() {
    // $(function () {
    //   $('.example').DataTable({
    //     responsive: true,
    //     paging: false,
    //     columnDefs: [
    //       { responsivePriority: 2, targets: -1 }
    //     ]
    //   });
    // });
  }
}
