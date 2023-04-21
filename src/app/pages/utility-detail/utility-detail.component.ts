import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery' 
import 'datatables.net';
import 'datatables.net-responsive-bs5';
import 'datatables.net-responsive';
import {UtilityService} from 'src/app/service/utility/utility.service'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-utility-detail',
  templateUrl: './utility-detail.component.html',
  styleUrls: ['./utility-detail.component.css']
})
export class UtilityDetailComponent implements OnInit{
  utilityData:any;
  constructor(private utility : UtilityService,private http:HttpClient) {
    this.Find();
  }
  ngOnInit(){
    $(function() {
          $('.example').DataTable({
            responsive: true,
            searching:true,
          paging:false,
            columnDefs: [
              { responsivePriority: 2, targets: -1 }
          ]
          });
        });
  }
  Find(){
    this.utility.Find().subscribe(data =>
      {
        this.utilityData = data; 
      });
  }
  delete(id:any){
    if(confirm('delete?')){
      this.utility.Removedata(id).subscribe(data =>
        {
          this.Find(); 
        });
    }
      
    }

}
