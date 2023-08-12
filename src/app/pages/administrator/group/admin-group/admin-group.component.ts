import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { AdminGroupService } from 'src/app/service/admin-group/admin-group.service';
import { HttpClient } from '@angular/common/http';
import { UserFormComponent } from '../../users/user-form/user-form.component';

@Component({
  selector: 'app-admin-group',
  templateUrl: './admin-group.component.html',
  styleUrls: ['./admin-group.component.css'],
})
export class AdminGroupComponent implements OnInit {
  @ViewChild(UserFormComponent)
  userFormComponent!: UserFormComponent;
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  groupdata: any[] = [];
  name: any;
  constructor(private group: AdminGroupService, private http: HttpClient) {
    this.LoadGroupData();
  }

  LoadGroupData() {
    this.skip = this.limit * (this.page - 1);
    this.group.LoadGroupData(this.skip, this.limit).subscribe((data: any) => {
      this.groupdata = data.results;
      this.count = data.count;
      this.name = data.results.map((item: any) => item.name);
      this.userFormComponent.updategroupname(this.name);
    });
  }

  delete(id: any) {
    if (confirm('delete?')) {
      this.group.Removedata(id).subscribe((data) => {
        this.LoadGroupData();
      });
    }
  }
  ngOnInit() {
    this.LoadGroupData();
  }
}
