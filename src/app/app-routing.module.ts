import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlTree } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthGuard } from './_helpers';
import { Role } from './_models/role';

const routes: Routes = [
  // { path: '', component: LoginComponent },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  {
    path: 'auth',
    // component: ProjectComponent,
    children: [
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forget', component: ForgetpasswordComponent },
    ],
  },
  {
    path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'account', loadChildren: accountModule },
  // { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
  // {
  //   path: 'admin',
  //   loadChildren: adminModule,
  //   canActivate: [AuthGuard],
  //   data: { roles: [Role.Admin] },
  // },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
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
