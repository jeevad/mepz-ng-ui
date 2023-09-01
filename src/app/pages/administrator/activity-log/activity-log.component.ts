import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { ActivitiesService } from 'src/app/service/activities/activities.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MyCustomDialogService } from 'src/app/components/my-custom-dialog/my-custom-dialog.service';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.css'],
})

export class ActivityLogComponent implements OnInit {
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  activityData: any[] = [];
  loader: boolean = false;
  maxSize: number = 5;

  constructor(private group: ActivitiesService, private customDialog: MyCustomDialogService, private breakpointObserver: BreakpointObserver) {}

  findAll() {
    this.loader = true;
    this.skip = this.limit * (this.page - 1);
    this.group.findAll(this.skip, this.limit).subscribe((data: any) => {
      this.activityData = data.results;
      this.count = data.count;
      this.loader = false;
    });
  }

  changePageLimit() {
    this.skip = 0;
    this.findAll();
  }

  delete(id: any) {
    const dialogRef = this.customDialog.openConfirmDialog({
      dialogMsg: 'Are you sure want to delete?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.group.Removedata(id).subscribe((data) => {
          this.findAll();
        });
      }
    });
  }

  ngOnInit() {
    this.findAll();
    this.reponsivePagination();
  }

  reponsivePagination(){
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe(result => {
      if (result.matches) {
        this.maxSize = 1;
      } else {
        this.maxSize = 5;
      }
    });
  }

}
