import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
})
export class ForgetpasswordComponent implements OnInit{

  fpwForm!:FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder:FormBuilder){}
  
  ngOnInit(): void {
    this.fpwForm = this.formBuilder.group({
      'email':['',[Validators.required,Validators.email]]
    })
  }

  get f(){
    return this.fpwForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.fpwForm.valid){
      this.submitted = false;
    }
  }
}
