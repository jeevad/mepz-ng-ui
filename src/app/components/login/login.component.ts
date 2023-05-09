import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  submit(login: any) {
    console.log('form submitted', login);
  }

  logmsg(value: string) {
    console.log(value);
  }
}
