import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { PackageService } from 'src/app/service/package/package.service';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MyCustomDialogService } from 'src/app/components/my-custom-dialog/my-custom-dialog.service';
import { ToasterService } from '@app/components/toaster/toaster.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css'],
})

export class PackageComponent implements OnInit {
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  packagedata: any[] = [];
  loader: boolean = false;
  maxSize: number = 5;

  constructor(private http: HttpClient, private service: PackageService, private customDialog: MyCustomDialogService, public toastService: ToasterService, private breakpointObserver: BreakpointObserver) {
    this.Find();
  }

  ngOnInit() {
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
    this.service.Find(this.skip, this.limit).subscribe((data: any) => {
      this.packagedata = data.results;
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
          this.toastService.show('Package deleted', {
            classname: 'bg-danger text-light',
            delay: 10000,
          });
          this.Find();
        });
      }
    });
  }
}
