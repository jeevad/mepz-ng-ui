import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { PackageService } from 'src/app/service/package/package.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css'],
})
export class PackageComponent implements OnInit {
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  packagedata: any[] = [];

  constructor(private http: HttpClient, private service: PackageService) {
    this.Find();
  }

  ngOnInit() {}

  Find() {
    this.skip = this.limit * (this.page - 1);
    this.service.Find(this.skip, this.limit).subscribe((data: any) => {
      this.packagedata = data.results;
      this.count = data.count;
    });
  }
  
  delete(id: any) {
    if (confirm('delete?')) {
      this.service.Removedata(id).subscribe((data) => {
        this.Find();
      });
    }
  }
}
