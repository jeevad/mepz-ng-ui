import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ClassificationService } from 'src/app/service/classification/classification.service';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MyCustomDialogService } from 'src/app/components/my-custom-dialog/my-custom-dialog.service';

@Component({
  selector: 'app-hospital-classification',
  templateUrl: './hospital-classification.component.html',
  styleUrls: ['./hospital-classification.component.css'],
})
export class HospitalClassificationComponent implements OnInit {
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  classificationdata: any[] = [];
  loader: boolean = false;
  maxSize: number = 5;
  
  constructor(
    private service: ClassificationService,
    private http: HttpClient,
    private customDialog: MyCustomDialogService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.find();
  }

  ngOnInit() {
    this.find();
    this.reponsivePagination();
  }
  find() {
    this.loader = true;
    this.skip = this.limit * (this.page - 1);
    this.service.Find(this.skip, this.limit).subscribe((result: any) => {
      this.classificationdata = result.results;
      this.count = result.count;
      this.loader = false;
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
        this.service.Removedata(id).subscribe((classificationdata) => {
          this.find();
        });
      }
    });
  }
}
