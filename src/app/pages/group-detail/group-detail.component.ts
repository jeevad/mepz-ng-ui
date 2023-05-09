import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { GroupsService } from 'src/app/service/groups/groups.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css'],
})
export class GroupDetailComponent implements OnInit {
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  groupsData: any[] = [];
  constructor(private groups: GroupsService, private http: HttpClient) {
    this.Find();
  }

  ngOnInit() {
    this.Find();
  }
  Find() {
    this.skip = this.limit * (this.page - 1);

    this.groups.Find(this.skip, this.limit).subscribe((data: any) => {
      this.groupsData = data.results;
      this.count = data.count;
    });
  }
  delete(id: any) {
    if (confirm('delete?')) {
      this.groups.Removedata(id).subscribe((data) => {
        this.Find();
      });
    }
  }
}
