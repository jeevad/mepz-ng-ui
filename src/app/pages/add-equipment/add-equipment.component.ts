import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { EquipmentService } from 'src/app/service/equipment/equipment.service';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})

export class AddEquipmentComponent implements OnInit{

  departmentdata:any;
  active:any = ['Active','Inactive']
  message='';
  messageclass ='';
  error:boolean = false;
  isEdit:boolean = false;
  deptid:any;
  editdata:any;
  submitted:boolean = false;
  addDepartment!:FormGroup;

  constructor(private department:EquipmentService,private router:Router,private route:ActivatedRoute,private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    console.log("ngOnint");
    this.deptid = this.route.snapshot.paramMap.get('id');
    console.log(this.deptid);
    this.route.params.subscribe(param=>{
      if(param && param['id']){
        console.log("Param >> ",param['id']);
        this.department.LoadbyID(param['id']).subscribe(resp=>{
          this.isEdit = true;
          this.addDepartment.patchValue(resp);
        })
      }
    })
    this.addDepartment = this.formBuilder.group({
     
      "equipmentCode": [""],
      "equipmentName": [""],
      "cost": [""],
      "markUp": [""],
      "heatDissipation": [""],
      "ictPort": [""],
      "bssPort": [""],
    })
  }

  SaveData(){
    if(!this.isEdit){
      this.submitted = true;
      if(this.addDepartment.valid){
        this.department.SaveData(this.addDepartment.value).subscribe(result => {
          console.log("result",result);
          this.router.navigate(['/equipment-data']);
        });
      }
    }else if(this.isEdit){
      this.submitted = true;
      if(this.addDepartment.valid){
        this.department.update(this.deptid,this.addDepartment.value).subscribe(data =>{
          this.isEdit=false;
          this.router.navigate(['/equipment-data']);
        })
      }
    }
  }

  change(e: any) {
    this.active = e.target.value;
  }

}
