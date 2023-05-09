import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UtilityService } from 'src/app/service/utility/utility.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-utility-detail',
  templateUrl: './utility-detail.component.html',
  styleUrls: ['./utility-detail.component.css'],
})
export class UtilityDetailComponent implements OnInit {
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  utilityData: any[] = [];
  constructor(private utility: UtilityService, private http: HttpClient) {
    this.Find();
  }
  ngOnInit() {
    this.Find();
  }
  Find() {
    this.skip = this.limit * (this.page - 1);
    this.utility.Find(this.skip, this.limit).subscribe((data: any) => {
      this.utilityData = data.results;
      this.count = data.count;
    });
  }
  delete(id: any) {
    if (confirm('delete?')) {
      this.utility.Removedata(id).subscribe((data) => {
        this.Find();
      });
    }
  }
}
