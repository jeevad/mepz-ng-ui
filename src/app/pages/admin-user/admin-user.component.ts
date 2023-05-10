import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { UsermodelService } from 'src/app/service/usermodel/usermodel.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  userdata: any[] = [];

  constructor(private service: UsermodelService, private http: HttpClient) {
    this.find();
  }

  ngOnInit() {
    this.find();
  }
  find() {
    this.skip = this.limit * (this.page - 1);
    this.service.find(this.skip, this.limit).subscribe((data: any) => {
      console.log(data);
      this.userdata = data.results;
      this.count = data.count;
      console.log(data.count);
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
