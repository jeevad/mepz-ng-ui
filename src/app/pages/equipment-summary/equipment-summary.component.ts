import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SummaryService } from 'src/app/service/summary/summary.service';

@Component({
  selector: 'app-equipment-summary',
  templateUrl: './equipment-summary.component.html',
  styleUrls: ['./equipment-summary.component.css'],
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
      this.summaryData = data.results;
      this.count = data.count;
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
      },
    });
  }
  buttonInRowClick(event: any): void {
    event.stopPropagation();
  }

  wholeRowClick(): void {}

  nextButtonClickEvent(): void {}
  previousButtonClickEvent(): void {}
}
