import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
// import 'datatables.net';
// import 'datatables.net-responsive-bs5';
// import 'datatables.net-responsive';
import { AdminGroupService } from 'src/app/service/admin-group/admin-group.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-admin-group',
  templateUrl: './admin-group.component.html',
  styleUrls: ['./admin-group.component.css']
})
export class AdminGroupComponent implements OnInit {
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  groupdata: any[] = [];
  constructor(private group: AdminGroupService, private http: HttpClient) {
    this.LoadGroupData();
  }
  LoadGroupData() {
    this.skip = this.limit * (this.page - 1);
    this.group.LoadGroupData(this.skip, this.limit).subscribe((data : any)=> {
      console.log(data);
      this.groupdata = data.results;
      this.count = data.count;
    });
  }
  delete(id: any) {
    if (confirm('delete?')) {
      this.group.Removedata(id).subscribe(data => {
        this.LoadGroupData();
      });
    }

  }
 ngOnInit() {
    this.LoadGroupData();

  }
}
