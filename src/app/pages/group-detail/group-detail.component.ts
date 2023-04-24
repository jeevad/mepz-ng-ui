import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
// import 'datatables.net';
// import 'datatables.net-responsive-bs5';
// import 'datatables.net-responsive';
import { GroupsService } from 'src/app/service/groups/groups.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  groupsData: any;
  constructor(private groups: GroupsService, private http: HttpClient) {
    this.Find();
  }


  ngOnInit() {
    // $(function () {
    //   $('.example').DataTable({
    //     responsive: true,
    //     searching: true,
    //     paging: false,
    //     columnDefs: [
    //       { responsivePriority: 2, targets: -1 }
    //     ]
    //   });
    // });
  }
  Find() {
    this.groups.Find().subscribe(data => {
      // console.log(data);
      this.groupsData = data;
    });
  }
  delete(id: any) {
    if (confirm('delete?')) {
      this.groups.Removedata(id).subscribe(data => {
        this.Find();
      });
    }
  }

}
