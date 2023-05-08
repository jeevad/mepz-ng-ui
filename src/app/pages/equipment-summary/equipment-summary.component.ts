import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SummaryService } from 'src/app/service/summary/summary.service';

@Component({
  selector: 'app-equipment-summary',
  templateUrl: './equipment-summary.component.html',
  styleUrls: ['./equipment-summary.component.css']
})
export class EquipmentSummaryComponent {
  page = 1;
  limit = 10;
  skip = 0;
  count: number = 0;
  summaryData: any[] = [];


  constructor(private service: SummaryService, private http: HttpClient) {
    this.find();
  }
  find() {
    this.skip = this.limit * (this.page - 1);
    this.service.Find(this.skip, this.limit).subscribe((data: any) => {
      // console.log(data);
      this.summaryData = data.results;
      this.count = data.count;
      // console.log(data.count);
    });
  }

  delete(id: any) {
    if (confirm('delete?')) {
      this.service.Removedata(id).subscribe((data) => {
        this.find();
      });
    }
  }
  ngOnInit() {
    let table = $('#example').DataTable({
      drawCallback: () => {
        $('.paginate_button.next').on('click', () => {
            this.nextButtonClickEvent();
          });
      }
    });
  }
  buttonInRowClick(event: any): void {
    event.stopPropagation();
    console.log('Button in the row clicked.');
  }

  wholeRowClick(): void {
    console.log('Whole row clicked.');
  }

  nextButtonClickEvent(): void {
    //do next particular records like  101 - 200 rows.
    //we are calling to api

    console.log('next clicked')
  }
  previousButtonClickEvent(): void {
    //do previous particular the records like  0 - 100 rows.
    //we are calling to API
  }


}
