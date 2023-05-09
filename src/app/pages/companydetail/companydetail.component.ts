import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CompanyService } from 'src/app/service/master-company/company.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-companydetail',
  templateUrl: './companydetail.component.html',
  styleUrls: ['./companydetail.component.css'],
})
export class CompanydetailComponent implements OnInit {
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  data: any[] = [];

  constructor(private service: CompanyService, private http: HttpClient) {
    this.find();
  }
  ngOnInit() {
    this.find();
  }
  find() {
    this.skip = this.limit * (this.page - 1);
    this.service.Load(this.skip, this.limit).subscribe((result: any) => {
      this.data = result.results;
      this.count = result.count;
    });
  }
  delete(id: any) {
    if (confirm('delete?')) {
      this.service.Removedata(id).subscribe((data) => {
        this.find();
      });
    }
  }
}
