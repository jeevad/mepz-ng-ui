import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UtilityService } from 'src/app/service/utility/utility.service';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MyCustomDialogService } from 'src/app/components/my-custom-dialog/my-custom-dialog.service';
import { ToasterService } from '@app/components/toaster/toaster.service';

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
  loader: boolean = false;
  utilityData: any[] = [];
  maxSize: number = 5;

  constructor(private utility: UtilityService, private http: HttpClient, private customDialog: MyCustomDialogService, public toastService: ToasterService, private breakpointObserver: BreakpointObserver) {
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
    this.utility.Find(this.skip, this.limit).subscribe((data: any) => {
      this.utilityData = data.results;
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
        this.utility.Removedata(id).subscribe((data) => {
          this.loader = false;
          this.toastService.show('Utility deleted', {
            classname: 'bg-danger text-light',
            delay: 10000,
          });
          this.Find();
        });
      }
    });
  }
}
