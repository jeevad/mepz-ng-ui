import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery'
// import 'datatables.net';
// import 'datatables.net-responsive-bs5';
// import 'datatables.net-responsive';
import { EquipmentService } from 'src/app/service/equipment/equipment.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css']
})
export class EquipmentDetailComponent implements OnInit {
[x: string]: any;
page = 1;
limit = 10;
skip = 0;
count: number = 0;
  equipmentdata: any[] = [];

  constructor(private department: EquipmentService, private http: HttpClient) {
    this.Load();
  }
  ngOnInit() {
    this.Load();

  }
  Load() {
    this.skip = this.limit * (this.page - 1);
    this.department.Load(this.skip, this.limit).subscribe((data : any) => {
      console.log(data);
      this.equipmentdata = data.results;
      this.count = data.count;
    });
  }
  delete(id: any) {
    if (confirm('delete?')) {
      this.department.Removedata(id).subscribe(data => {
        this.Load();
      });
    }

  }
}
