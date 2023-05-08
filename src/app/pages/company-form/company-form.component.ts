import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {CompanyService} from 'src/app/service/master-company/company.service'
@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css']
})
export class CompanyFormComponent implements OnInit{
  data:any;
  isEdit:boolean = false;
  companyid:any;
  submitted:boolean = false;
  addCompany!:FormGroup;

  constructor(private service:CompanyService,private router:Router,private route:ActivatedRoute,private formBuilder:FormBuilder){}

  ngOnInit(): void {
    console.log("ngOnint");
    this.companyid = this.route.snapshot.paramMap.get('id');
    console.log(this.companyid);
    this.route.params.subscribe(param=>{
      if(param && param['id']){
        console.log("Param >> ",param['id']);
        this.service.FindbyID(param['id']).subscribe(resp=>{
          this.isEdit = true;
          this.addCompany.patchValue(resp);
        })
      }
    })
    this.addCompany = this.formBuilder.group({
      'code':['',Validators.required],
      'inactive' : false,
      'name':['',Validators.required],
      'address1' : ['',Validators.required],
      'address2' : [''],
      'city' :  ['',Validators.required],
      'state' : ['',Validators.required],
      'postal':['',Validators.required],
      'country' : ['',Validators.required],
      'logo1' : [''],
      'show1':false,
      'logo2' : [''],
      'show2':false,
      'logo3' : [''],
      'show3':false,
      'contact' : ['',Validators.compose([Validators.maxLength(10),Validators.required])],
      'phone' : ['',Validators.compose([Validators.maxLength(10),Validators.required])],
      'fax': ['',Validators.required],
      'mobile': ['',Validators.compose([Validators.maxLength(10),Validators.required])],
      'email' :['',Validators.compose([Validators.email,Validators.required])]
    })
}
SaveData(){
  if(!this.isEdit){
    this.submitted = true;
    if(this.addCompany.valid){
      this.service.SaveData(this.addCompany.value).subscribe(result => {
        console.log("result",result);
        this.router.navigate(['/company']);
      });
    }
  }else if(this.isEdit){
    this.submitted = true;
    if(this.addCompany.valid){
      this.service.update(this.companyid,this.addCompany.value).subscribe(data =>{
        this.isEdit=false;
        this.router.navigate(['/company']);
      })
    }
  }

}
}
