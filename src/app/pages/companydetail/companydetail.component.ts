import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { CompanyService } from 'src/app/service/master-company/company.service';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MyCustomDialogService } from 'src/app/components/my-custom-dialog/my-custom-dialog.service';
import { ToasterService } from '@app/components/toaster/toaster.service';

@Component({
  selector: 'app-companydetail',
  templateUrl: './companydetail.component.html',
  styleUrls: ['./companydetail.component.css'],
})
export class CompanydetailComponent implements OnInit {
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  data: any[] = [];
  loader: boolean = false;
  maxSize: number = 5;

  constructor(private service: CompanyService, private http: HttpClient, private customDialog: MyCustomDialogService, public toastService: ToasterService, private breakpointObserver: BreakpointObserver) {
    this.find();
  }
  ngOnInit() {
    this.find();
    this.reponsivePagination();
  }

  find() {
    this.loader = true;
    this.skip = this.limit * (this.page - 1);
    this.service.Load(this.skip, this.limit).subscribe((result: any) => {
      this.loader = false;
      this.data = result.results;
      this.count = result.count;
    });
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

  delete(id: any) {
    const dialogRef = this.customDialog.openConfirmDialog({
      dialogMsg: 'Are you sure want to delete?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.service.Removedata(id).subscribe((data) => {
          this.toastService.show('Company deleted', {
            classname: 'bg-danger text-light',
            delay: 10000,
          });
          this.find();
        });
      }
    });
  }
}
