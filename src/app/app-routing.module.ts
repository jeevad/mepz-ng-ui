import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlTree } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget', component: ForgetpasswordComponent },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingcomponents = [
  SignupComponent,
  LoginComponent,
  HeaderComponent,
  ForgetpasswordComponent,
];
