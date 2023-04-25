import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project/project.service';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent {
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



  constructor(private department:ProjectService,private router:Router,private route:ActivatedRoute,private formBuilder:FormBuilder) {}

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
      'code':[''],
      'projectname':[''],
      'fullProjectName':[''],
      'clientOwner':[''],
      'contractNo':[''],
      'classification':[''],
      'projecttype':[''],
      'company':[''],
      'signature1':[''],
      'signature2':[''],
      'remarks':[''],
      'noofBeds':[''],

    })
  }

  SaveData(){
    if(!this.isEdit){
      this.submitted = true;
      if(this.addDepartment.valid){
        this.department.SaveData(this.addDepartment.value).subscribe(result => {
          console.log("result",result);
          this.router.navigate(['/project']);
        });
      }
    }else if(this.isEdit){
      this.submitted = true;
      if(this.addDepartment.valid){
        this.department.update(this.deptid,this.addDepartment.value).subscribe(data =>{
          this.isEdit=false;
          this.router.navigate(['/project']);
        })
      }
    }
  }

  change(e: any) {
    this.active = e.target.value;
  }

}




