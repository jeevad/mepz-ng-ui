import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery' 
import 'datatables.net';
import 'datatables.net-responsive-bs5';
import 'datatables.net-responsive';
import {AdminGroupService} from 'src/app/service/admin-group/admin-group.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-admin-group',
  templateUrl: './admin-group.component.html',
  styleUrls: ['./admin-group.component.css']
})
export class AdminGroupComponent implements OnInit {
 groupdata:any;
  constructor(private group:AdminGroupService,private http:HttpClient){
    this.LoadGroupData();
  }
  LoadGroupData(){
    this.group.LoadGroupData().subscribe(data =>
      {
        // console.log(data);
        this.groupdata = data; 
      });
  }
  delete(id:any){
    if(confirm('delete?')){
      this.group.Removedata(id).subscribe(data =>
        {
          this.LoadGroupData(); 
        });
    }
      
    }


  ngOnInit(){
    $(function() {
          $('.example').DataTable({
            responsive: true,
            columnDefs: [
              { responsivePriority: 2, targets: -1 }
          ]
          });
        });
      }



 
}
