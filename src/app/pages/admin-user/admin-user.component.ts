import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery' 
import 'datatables.net';
import 'datatables.net-responsive-bs5';
import 'datatables.net-responsive';
@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  userdata: any;

  constructor(){}

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
