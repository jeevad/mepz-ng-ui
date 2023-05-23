import { Component } from '@angular/core';

@Component({
  selector: 'app-past-transaction',
  templateUrl: './past-transaction.component.html',
  styleUrls: ['./past-transaction.component.css'],
})
export class PastTransactionComponent {
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
