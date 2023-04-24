import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
// import 'datatables.net';
// import 'datatables.net-responsive-bs5';
// import 'datatables.net-responsive';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css']
})
export class EquipmentDetailComponent implements OnInit {
  ngOnInit() {
    // $(function () {
    //   $('.example').DataTable({
    //     responsive: true,
    //     columnDefs: [
    //       { responsivePriority: 2, targets: -1 }
    //     ]
    //   });
    // });
  }
}
