import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { UsermodelService } from 'src/app/service/users/users.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MyCustomDialogService } from 'src/app/components/my-custom-dialog/my-custom-dialog.service';
import { ToasterService } from '@app/components/toaster/toaster.service';

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
  loader: boolean = false;
  maxSize: number = 5;

  constructor(private service: UsermodelService, private http: HttpClient, private customDialog: MyCustomDialogService, public toastService: ToasterService, private breakpointObserver: BreakpointObserver) {
    this.find();
  }

  ngOnInit() {
    this.find();
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

  find() {
    this.loader = true;
    this.skip = this.limit * (this.page - 1);
    this.service.find(this.skip, this.limit).subscribe((data: any) => {
      console.log(data);
      this.userdata = data.results;
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
        this.service.Removedata(id).subscribe((data) => {
          this.loader = false;
          this.toastService.show('User deleted', {
            classname: 'bg-danger text-light',
            delay: 10000,
          });
          this.find();
        });
      }
    });
  }
}
