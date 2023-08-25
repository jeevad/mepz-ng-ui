import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/service/currency/currency.service';
import { HttpClient } from '@angular/common/http';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(private service: CurrencyService, private http: HttpClient) {
    this.find();
  }

  ngOnInit() {
    this.find();
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
    if (confirm('delete?')) {
      this.service.Removedata(id).subscribe((data) => {
        this.find();
      });
    }
  }
}
