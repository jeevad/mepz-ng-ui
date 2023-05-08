import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
// import 'datatables.net';
// import 'datatables.net-responsive-bs5';
// import 'datatables.net-responsive';
import { DepartmentService } from 'src/app/service/department/department.service'
import { HttpClient } from '@angular/common/http';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  page = 1;
  limit = 10;
  skip = 0;
  count : number = 0;
  departmentData: any[] = [];

  constructor(private department: DepartmentService, private http: HttpClient) {
    this.Load();
  }
  ngOnInit() {
    this.Load();

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
    this.skip = this.limit*(this.page-1)
    this.department.Load(this.skip, this.limit).subscribe((data : any) => {
      console.log(data);
      this.departmentData = data.results;
      this.count = data.count;

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
