import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery'
// import 'datatables.net';
// import 'datatables.net-responsive-bs5';
// import 'datatables.net-responsive';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css']
})
export class ActivityLogComponent implements OnInit {
  // page = 4;
  // selectPage(page: string) {
  // 	this.page = parseInt(page, 10) || 1;
  // }

  // formatInput(input: HTMLInputElement) {
  // 	input.value = input.value.replace(FILTER_PAG_REGEX, '');
  // }
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
