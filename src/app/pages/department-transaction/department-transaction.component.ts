import { Component } from '@angular/core';

@Component({
  selector: 'app-department-transaction',
  templateUrl: './department-transaction.component.html',
  styleUrls: ['./department-transaction.component.css']
})
export class DepartmentTransactionComponent {
  ngOnInit() {
    let table = $('#example').DataTable({
      drawCallback: () => {
        $('.paginate_button.next').on('click', () => {
            this.nextButtonClickEvent();
          });
      }
    });

    let table1 = $('#example1').DataTable({
      drawCallback: () => {
        $('.paginate_button.next').on('click', () => {
            this.nextButtonClickEvent();
          });
      }
    });

    let table2 = $('#example2').DataTable({
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
