

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ProjecttemplateService } from 'src/app/service/projecttemplate/projecttemplate.service';
import {ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-project-newtemplate',
  templateUrl: './project-newtemplate.component.html',
  styleUrls: ['./project-newtemplate.component.css']
})
export class ProjectNewtemplateComponent {

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

  constructor(private department:ProjecttemplateService,private router:Router,private route:ActivatedRoute,private formBuilder:FormBuilder) {}

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
      'name':[''],
      'noofbeds':[''],
      'remarks':[''],
      'classification':[''],
      'projecttype':[''],

    })
  }

  classifications = [
    { value: 'CHI', label: 'CHILDRENS HOSPITAL' },
    { value: 'DEPARTMENT', label: 'MEDICAL EQUIPMENT PLANNING' },
    { value: 'GEN', label: 'GENERAL HOSPITAL' },
    { value: 'KK0001', label: 'KLINIK KESIHATAN 2' },
    { value: 'SPEC', label: 'SPECIALIZED HOSPITAL' }
  ];


  projecttypes = [
    { value: 'GOV', label: 'GOVERNMENT' },
    { value: 'SEC', label: 'PRIVATE' },
];

  SaveData(){
    if(!this.isEdit){
      this.submitted = true;
      if(this.addDepartment.valid){
        this.department.SaveData(this.addDepartment.value).subscribe(result => {
          console.log("result",result);
          this.router.navigate(['/project-template']);
        });
      }
    }else if(this.isEdit){
      this.submitted = true;
      if(this.addDepartment.valid){
        this.department.update(this.deptid,this.addDepartment.value).subscribe(data =>{
          this.isEdit=false;
          this.router.navigate(['/project-template']);
        })
      }
    }
  }

  change(e: any) {
    this.active = e.target.value;
  }

}




