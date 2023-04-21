import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery' 
import 'datatables.net';
import 'datatables.net-responsive-bs5';
import 'datatables.net-responsive';
import {PackageService} from 'src/app/service/package/package.service'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {
  packagedata:any ;
  constructor(private http:HttpClient,private service:PackageService){
    this.Find();
 }

 ngOnInit(){
  $(function() {
        $('.example').DataTable({
          responsive: true,
          paging:false,
          columnDefs: [
            { responsivePriority: 2, targets: -1 }
        ]
        });
      });
 }
 Find(){
  this.service.Find().subscribe(data => {
    this.packagedata = data;
  })
 }
 delete(id:any){
  if(confirm('delete?')){
    this.service.Removedata(id).subscribe(data =>
      {
        this.Find(); 
      });
  }
    
  }

  
}
