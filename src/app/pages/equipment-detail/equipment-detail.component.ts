import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery'
// import 'datatables.net';
// import 'datatables.net-responsive-bs5';
// import 'datatables.net-responsive';
import { EquipmentService } from 'src/app/service/equipment/equipment.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css']
})
export class EquipmentDetailComponent implements OnInit {
[x: string]: any;
  departmentData: any;

  constructor(private department: EquipmentService, private http: HttpClient) {
    this.Load();


  }
  ngOnInit() {
    // $(function () {
    //   $('.example').DataTable({
    //     responsive: true,
    //     columnDefs: [
    //       // { responsivePriority: 2, targets: -1 }
    //     ]
    //   });
    // });
  }
  Load() {
    this.department.Load().subscribe(data => {
      // console.log(data);
      this.departmentData = data;
    });
  }
  delete(id: any) {
    if (confirm('delete?')) {
      this.department.Removedata(id).subscribe(data => {
        this.Load();
      });
    }

  }
}
