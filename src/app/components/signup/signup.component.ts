import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

export class SignupComponent implements OnInit {

  signupForm!:FormGroup;
  submitted : boolean = false;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      'firstname':['',Validators.required],
      'lastname':['',Validators.required],
      'email':['',[Validators.required,Validators.email]],
      'password':['',Validators.required],
      'termsconditions':[false,Validators.requiredTrue],
    })
  }

  get f(){
    return this.signupForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.signupForm.valid && this.signupForm.value.termsconditions) {
      this.submitted = false;
    }
  }
}
