import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Department {
  departmentId: string;
  code: string;
  name: string;
  alias: string;
  active: boolean;
}

@Component({
  selector: 'app-department-transaction',
  templateUrl: './department-transaction.component.html',
  styleUrls: ['./department-transaction.component.css'],
})
export class DepartmentTransactionComponent {
  item: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    let table = $('#example').DataTable({
      drawCallback: () => {
        $('.paginate_button.next').on('click', () => {
          this.nextButtonClickEvent();
        });
      },
    });

    let table1 = $('#example1').DataTable({
      drawCallback: () => {
        $('.paginate_button.next').on('click', () => {
          this.nextButtonClickEvent();
        });
      },
    });

    let table2 = $('#example2').DataTable({
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

  addDepartment(): void {
    const selectedDepartments = $('#example1 tbody tr').filter(function () {
      return $(this).find('.checkbox').is(':checked');
    });

    const departmentsToAdd: Department[] = [];

    selectedDepartments.each(function () {
      const department: Department = {
        departmentId: $(this).find('td:nth-child(3)').text(),
        name: $(this).find('td:nth-child(2)').text(),
        code: $(this).find('td:nth-child(3)').text(),
        alias: 'Blessing',
        active: true,
      };
      departmentsToAdd.push(department);
    });
    const projectId = '646467de95e05b3c5c487776';
    const url = `http://localhost:3001/project/addDepartment/${projectId}`;
    this.http.post(url, departmentsToAdd).subscribe((response) => {
      console.log('Data stored in DB:', response);
    });

    console.log('Selected departments:', departmentsToAdd);
  }
}
