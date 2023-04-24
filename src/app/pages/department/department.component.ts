import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
// import 'datatables.net';
// import 'datatables.net-responsive-bs5';
// import 'datatables.net-responsive';
import { DepartmentService } from 'src/app/service/department/department.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departmentData: any;

  constructor(private department: DepartmentService, private http: HttpClient) {
    this.Load();
  }
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
