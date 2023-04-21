import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AdminGroupService} from 'src/app/service/admin-group/admin-group.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-admin-group-form',
  templateUrl: './admin-group-form.component.html',
  styleUrls: ['./admin-group-form.component.css']
})
export class AdminGroupFormComponent implements OnInit {
  groupdata:any;
  message='';
  messageclass='';
  error:boolean = false;
  isEdit:boolean = false;
  groupid:any;
  editdata:any;
  constructor(private group : AdminGroupService,private router:Router,private route:ActivatedRoute){

    this.groupid = this.route.snapshot.paramMap.get('id');
    console.log(this.groupid);
    if(this.groupid != null){
      this.Updatedata(this.groupid);
      this.isEdit=true;
    }
  }
   

  ngOnInit(): void {
    
  }

  addgroup = new FormGroup({
    groupname: new FormControl("", Validators.required),
  });


  
  // SaveGroupData(){
  //   if(this.addgroup.valid){
  //         this.group.SaveGroupData(this.addgroup.value).subscribe(result => {
  //           console.log(result);
  //           if(result != null){
  //             this.error=false;
  //             this.message="data saves"
  //             this.messageclass = "success"
  //             this.Cleardata();
  //             this.router.navigate(['/admin-group']);
  //           }
  //         });
  //       } else{
  //         this.error=true;
  //         this.message="please enter valid data"
  //         this.messageclass = "error"
  //       }
  // }

  SaveGroupData(){
    if(!this.isEdit){
      this.group.SaveGroupData(this.addgroup.value).subscribe(result => {
        console.log(result);
        if(result != null){
        
          this.message="data saves"
          this.messageclass = "success"
          this.Cleardata();
          this.router.navigate(['/admin-group']);   // router redirect
        }
      });
    } else if(this.isEdit){
		console.log(this.isEdit);
    console.log(this.groupid,this.editdata);
      this.updateRecord(this.groupid,this.editdata);  
      this.router.navigate(['/admin-group']);
    }
     else {
		   this.message="please enter valid data"
        this.messageclass = "error"
	}
   
  }
  Cleardata(){
    this.addgroup = new FormGroup({
      groupname: new FormControl("")
    });
  }

  Updatedata(Id:any) {
    this.group.LoadbyID(Id).subscribe(data => {
      this.editdata = data;
      console.log("edit",this.editdata);
      this.addgroup = new FormGroup({
         groupname: new FormControl(this.editdata.groupname) 
      });
      console.log("After getbyid",this.addgroup.value);
    });


  }

  updateRecord(Id:any,data:any){
    this.group.update(Id,this.addgroup.value).subscribe(data =>{
      this.isEdit=false;
    })
  }
}
