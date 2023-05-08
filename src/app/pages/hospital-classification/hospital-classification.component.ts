import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ClassificationService } from 'src/app/service/classification/classification.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hospital-classification',
  templateUrl: './hospital-classification.component.html',
  styleUrls: ['./hospital-classification.component.css']
})
export class HospitalClassificationComponent implements OnInit {
  page = 1;
  limit = 10;
  skip = 0;
  count : number = 0;
  classificationdata: any[] = [];
  constructor(private service: ClassificationService, private http: HttpClient) {
    this.find()
  }

  ngOnInit() {
    this.find();
  }
  find() {
    this.skip = this.limit * (this.page - 1);
    console.log(this.limit, "limit");

    this.service.Find(this.skip, this.limit).subscribe((result: any) => {
      console.log(result, "result");
      this.classificationdata = result.results;
      this.count = result.count;
      console.log(result.count, "count");
    });
  }
  delete(id: any) {
    if (confirm('delete?')) {
      this.service.Removedata(id).subscribe(classificationdata => {
        this.find();
      });
    }

  }

}
