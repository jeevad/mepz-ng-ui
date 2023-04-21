import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-responsive-bs5';
import 'datatables.net-responsive';
import {ClassificationService} from 'src/app/service/classification/classification.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hospital-classification',
  templateUrl: './hospital-classification.component.html',
  styleUrls: ['./hospital-classification.component.css']
})
export class HospitalClassificationComponent implements OnInit {
  data:any;

  constructor(private service : ClassificationService,private http : HttpClient){
    this.find()
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
  find(){
    this.service.Find().subscribe(result =>
      {
        this.data = result; 
      });
  }
  delete(id:any){
    if(confirm('delete?')){
      this.service.Removedata(id).subscribe(data =>
        {
          this.find(); 
        });
    }
      
    }

}
