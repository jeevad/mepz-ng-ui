import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlTree } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { HeaderComponent } from './components/header/header.component';

// const routes: Routes = [
//   {path: 'signup',component: SignupComponent},
//   { path: 'login', component: LoginComponent},
//   { path: '', component: LoginComponent},
//   { path: 'forget',component: ForgetpasswordComponent},
//   { path: 'header', component: HeaderComponent},
//   {path:'admin-user',component:AdminUserComponent},
//   { path: 'add-admin-user' , component:UserFormComponent},
//   { path: 'add-admin-user/:id' , component:UserFormComponent},
//   { path: 'admin-group', component:AdminGroupComponent},
//   { path:'admin-group-form/:id', component:AdminGroupFormComponent},
//   { path:'admin-group-form', component:AdminGroupFormComponent},
//   { path:'access-level',component:AccessLevelComponent},
//   { path: 'activity-log', component:ActivityLogComponent},
//   { path:'company',component:CompanydetailComponent},
//   { path:'company-form',component:CompanyFormComponent},
//   { path:'company-form/:id',component:CompanyFormComponent},
//   { path:'department', component:DepartmentComponent},
//   { path:'department-form',component:AddDepartmentComponent},
//   { path:'department-form/:id',component:AddDepartmentComponent},
//   { path:'group-detail',component:GroupDetailComponent},
//   { path:'group-form',component:AddGroupComponent},
//   { path:'group-form/:id',component:AddGroupComponent},
//   { path:'room-detail',component:RoomDetailComponent},
//   { path:'room-form',component:AddRoomComponent},
//   { path:'room-form/:id',component:AddRoomComponent},
//   { path:'dashboard',component:DashboardComponent},
//   { path:'utility-detail',component:UtilityDetailComponent},
//   { path:'add-utility',component:AddUtilityComponent},
//   { path:'add-utility/:id',component:AddUtilityComponent},
//   { path:'equipment-data',component:EquipmentDetailComponent},
//   { path: 'add-equipment',component:AddEquipmentComponent},
//   { path: 'add-equipment/:id',component:AddEquipmentComponent},
//   { path:'package',component:PackageComponent},
//   { path:'add-package',component:AddPackageComponent},
//   { path:'add-package/:id',component:AddPackageComponent},
//   { path:'hospital-data',component:HospitalClassificationComponent},
//   { path:'add-classification',component:AddClassificationComponent},
//   { path:'add-classification/:id',component:AddClassificationComponent},
//   { path:'currency',component:CurrencyComponent},
//   { path:'add-currency',component:AddCurrencyComponent} ,
//   { path:'add-currency/:id',component:AddCurrencyComponent},
//   {path:'project-template', component:ProjectTemplateComponent},
//   {path:'Project-newtemplate', component:ProjectNewtemplateComponent},
//   {path:'Project-newtemplate/:id', component:ProjectNewtemplateComponent},
//   {path:'project', component:ProjectComponent},
//   {path:'add-project', component:AddProjectComponent},
//   {path:'equipment-allocation', component: EquipmentAllocationComponent},
//   {path:'project/:projectId/equipment-allocation', component: EquipmentAllocationComponent},
//   {path:'equipment-summary', component:EquipmentSummaryComponent},
//   {path:'project/:projectId/equipment-summary', component:EquipmentSummaryComponent},
//   {path:'department-transaction', component:DepartmentTransactionComponent},
//   {path:'project/:projectId/department-transaction', component: DepartmentTransactionComponent },
//   {path:'project/:projectId/department-transaction/projectId/view-rooms', component: DepartmentTransactionComponent },
//   {path:'past-transaction', component:PastTransactionComponent},
//   {path:'project/:projectId/past-transaction', component: PastTransactionComponent },
//   {path:'project/:projectId/past-transaction/projectId/transaction-view', component: PastTransactionComponent },
//   {path:'edit-project', component:ProjectEditComponent},
//   {path:'edit-project/:id', component:ProjectEditComponent},
//   {path:'reports', component:ReportsComponent},
//   {path:'specification', component:EquipmentSpecificationComponent},
//   {path:'brand', component:EquipmentBrandComponent},
//   {path:'reports-by-package', component:ReportsByPackageComponent},
//   {path:'template-department', component:TemplateDepartmentComponent},
//   {path:'edit-admin-user', component:EditAdminUserComponent},
//   {path:'view-rooms', component:ViewRoomsComponent},
//   {path:'transaction-view', component:TransactionViewComponent}
// ];
const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'forget', component: ForgetpasswordComponent },
  { path: 'header', component: HeaderComponent },
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
