import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { AdminGroupService } from 'src/app/service/admin-group/admin-group.service';
import { HttpClient } from '@angular/common/http';
import { UserFormComponent } from '../../users/user-form/user-form.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MyCustomDialogService } from 'src/app/components/my-custom-dialog/my-custom-dialog.service';

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
  loader: boolean = false;
  maxSize: number = 5;

  constructor(private group: AdminGroupService, private breakpointObserver: BreakpointObserver, private customDialog: MyCustomDialogService) {}

  LoadGroupData() {
    this.loader = true;
    this.skip = this.limit * (this.page - 1);
    this.group.LoadGroupData(this.skip, this.limit).subscribe((data: any) => {
      this.groupdata = data.results;
      this.count = data.count;
      this.name = data.results.map((item: any) => item.name);
      this.loader = false;
      this.userFormComponent.updategroupname(this.name);
    });
  }

  delete(id: any) {
    const dialogRef = this.customDialog.openConfirmDialog({
      dialogMsg: 'Are you sure want to delete?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.group.Removedata(id).subscribe((data) => {
          this.LoadGroupData();
        });
      }
    });
  }
  ngOnInit() {
    this.LoadGroupData();
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
