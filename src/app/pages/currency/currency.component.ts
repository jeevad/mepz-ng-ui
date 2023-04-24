import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-responsive-bs5';
// import 'datatables.net-responsive';
import { CurrencyService } from 'src/app/service/currency/currency.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  currencyData: any;
  constructor(private service: CurrencyService, private http: HttpClient) {
    this.find();
  }
  ngOnInit() {
    // $(function () {
    //   $('.example').DataTable({
    //     responsive: true,
    //     paging: false,
    //     columnDefs: [
    //       { responsivePriority: 2, targets: -1 }
    //     ]
    //   });
    // });
  }

  find() {
    this.service.Find().subscribe(data => {
      console.log(data);
      this.currencyData = data;
    });
  }
  delete(id: any) {
    if (confirm('delete?')) {
      this.service.Removedata(id).subscribe(data => {
        this.find();
      });
    }

  }
}
