import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
// import 'datatables.net';
// import 'datatables.net-responsive-bs5';
// import 'datatables.net-responsive';
import { CompanyService } from 'src/app/service/master-company/company.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-companydetail',
  templateUrl: './companydetail.component.html',
  styleUrls: ['./companydetail.component.css']
})
export class CompanydetailComponent implements OnInit {
  data: any;

  constructor(private service: CompanyService, private http: HttpClient) {
    this.find();
  }


  ngOnInit() {
    // $(function () {
    //   $('.example').DataTable({
    //     responsive: true,
    //     "paging": false,
    //     columnDefs: [
    //       { responsivePriority: 2, targets: -1, }
    //     ]
    //   });
    // });
  }
  find() {
    this.service.Find().subscribe(result => {
      console.log(result);
      this.data = result;
    });
  }
  delete(id: any) {
    if (confirm('delete?')) {
      this.service.Removedata(id).subscribe(data => {
        this.find();
      });
    }

  }


}

