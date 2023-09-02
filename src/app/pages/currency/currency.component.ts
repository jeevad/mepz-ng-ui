import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/service/currency/currency.service';
import { HttpClient } from '@angular/common/http';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MyCustomDialogService } from 'src/app/components/my-custom-dialog/my-custom-dialog.service';
import { ToasterService } from '@app/components/toaster/toaster.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css'],
})

export class CurrencyComponent implements OnInit {
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  currencyData: any[] = [];
  newData: any;
  loader: boolean = false;
  maxSize: number = 5;

  constructor(private service: CurrencyService, private http: HttpClient, private customDialog: MyCustomDialogService, public toastService: ToasterService, private breakpointObserver: BreakpointObserver
    ) {
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
    this.service.Find(this.skip, this.limit).subscribe((data: any) => {
      this.currencyData = data.results;
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
        this.service.Removedata(id).subscribe((data) => {
          this.toastService.show('Currency deleted', {
            classname: 'bg-danger text-light',
            delay: 10000,
          });
          this.find();
        });
      }
    });
  }
}
