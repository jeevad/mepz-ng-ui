import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { GroupsService } from 'src/app/service/groups/groups.service';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MyCustomDialogService } from 'src/app/components/my-custom-dialog/my-custom-dialog.service';
import { ToasterService } from '@app/components/toaster/toaster.service';

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
  loader: boolean = false;
  maxSize: number = 5;
  
  constructor(private groups: GroupsService, private http: HttpClient, private breakpointObserver: BreakpointObserver, public toastService: ToasterService, private customDialog: MyCustomDialogService) {
    this.Find();
  }

  ngOnInit() {
    this.Find();
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

  Find() {
    this.loader = true;
    this.skip = this.limit * (this.page - 1);
    this.groups.Find(this.skip, this.limit).subscribe((data: any) => {
      this.groupsData = data.results;
      this.count = data.count;
      this.loader = false;
    });
  }
  
  delete(id: any) {
    const dialogRef = this.customDialog.openConfirmDialog({
      dialogMsg: 'Are you sure want to delete?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.loader = true;
        this.groups.Removedata(id).subscribe((data) => {
          this.loader = false;
          this.toastService.show('Group deleted', {
            classname: 'bg-danger text-light',
            delay: 10000,
          });
          this.Find();
        });
      }
    });

  }
}
