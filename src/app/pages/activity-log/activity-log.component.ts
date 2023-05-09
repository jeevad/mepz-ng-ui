import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as $ from 'jquery'
import { ActivitiesService } from 'src/app/service/activities/activities.service';
// import 'datatables.net';
// import 'datatables.net-responsive-bs5';
// import 'datatables.net-responsive';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  activityData: any[] = [];
  // page = 4;
  // selectPage(page: string) {
  // 	this.page = parseInt(page, 10) || 1;
  // }

  // formatInput(input: HTMLInputElement) {
  // 	input.value = input.value.replace(FILTER_PAG_REGEX, '');
  // }
  constructor(private group: ActivitiesService, private http: HttpClient) {
    this.LoadGroupData();
  }
  LoadGroupData() {
    this.skip = this.limit * (this.page - 1);
    this.group.LoadGroupData(this.skip, this.limit).subscribe((data : any)=> {
      console.log(data);
      this.activityData = data.results;
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
    // $(function() {
    //       $('.example').DataTable({
    //         responsive: true,
    //         columnDefs: [
    //           { responsivePriority: 2, targets: -1 }
    //       ]
    //       });
    //     });
  }

}
