import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlTree } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { HeaderComponent } from './components/header/header.component';
import { AdminUserComponent } from './pages/admin-user/admin-user.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { AdminGroupComponent } from './pages/admin-group/admin-group.component';
import { AdminGroupFormComponent } from './pages/admin-group-form/admin-group-form.component';
import { AccessLevelComponent } from './pages/access-level/access-level.component';
import { ActivityLogComponent } from './pages/activity-log/activity-log.component';
import { CompanydetailComponent } from './pages/companydetail/companydetail.component';
import { CompanyFormComponent } from './pages/company-form/company-form.component';
import { DepartmentComponent } from './pages/department/department.component';
import { AddDepartmentComponent } from './pages/add-department/add-department.component';
import { GroupDetailComponent } from './pages/group-detail/group-detail.component';
import { AddGroupComponent } from './pages/add-group/add-group.component';
import { RoomDetailComponent } from './pages/room-detail/room-detail.component';
import { AddRoomComponent } from './pages/add-room/add-room.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UtilityDetailComponent } from './pages/utility-detail/utility-detail.component';
import { AddUtilityComponent } from './pages/add-utility/add-utility.component';
import { EquipmentDetailComponent } from './pages/equipment-detail/equipment-detail.component';
import { AddEquipmentComponent } from './pages/add-equipment/add-equipment.component';
import { PackageComponent } from './pages/package/package.component';
import { AddPackageComponent } from './pages/add-package/add-package.component';
import { HospitalClassificationComponent } from './pages/hospital-classification/hospital-classification.component';
import { AddClassificationComponent } from './pages/add-classification/add-classification.component';
import { CurrencyComponent } from './pages/currency/currency.component';
import { AddCurrencyComponent } from './pages/add-currency/add-currency.component';
import { ProjectTemplateComponent } from './pages/project-template/project-template.component';
import { ProjectNewtemplateComponent } from './pages/project-newtemplate/project-newtemplate.component';
import { ProjectComponent } from './pages/project/project.component';
import { AddProjectComponent } from './pages/add-project/add-project.component';
import { EquipmentAllocationComponent } from './pages/equipment-allocation/equipment-allocation.component';
import { EquipmentSummaryComponent } from './pages/equipment-summary/equipment-summary.component';
import { DepartmentTransactionComponent } from './pages/department-transaction/department-transaction.component';
import { PastTransactionComponent } from './pages/past-transaction/past-transaction.component';
import { ProjectEditComponent } from './pages/project-edit/project-edit.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { EquipmentSpecificationComponent } from './pages/equipment-specification/equipment-specification.component';
import { EquipmentBrandComponent } from './pages/equipment-brand/equipment-brand.component';
import { ReportsByPackageComponent } from './pages/reports-by-package/reports-by-package.component';
import { TemplateDepartmentComponent } from './pages/template-department/template-department.component';
import { EditAdminUserComponent } from './pages/edit-admin-user/edit-admin-user.component';
import { ViewRoomsComponent } from './pages/view-rooms/view-rooms.component';


const routes: Routes = [
  {path: 'signup',component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: '', component: LoginComponent},
  { path: 'forget',component: ForgetpasswordComponent},
  { path: 'header', component: HeaderComponent},
  {path:'admin-user',component:AdminUserComponent},
  { path: 'add-admin-user' , component:UserFormComponent},
  { path: 'admin-group', component:AdminGroupComponent},
  { path:'admin-group-form/:id', component:AdminGroupFormComponent},
  { path:'admin-group-form', component:AdminGroupFormComponent},
  { path:'access-level',component:AccessLevelComponent},
  { path: 'activity-log', component:ActivityLogComponent},
  { path:'company',component:CompanydetailComponent},
  { path:'company-form',component:CompanyFormComponent},
  { path:'company-form/:id',component:CompanyFormComponent},
  { path:'department', component:DepartmentComponent},
  { path:'department-form',component:AddDepartmentComponent},
  { path:'department-form/:id',component:AddDepartmentComponent},
  { path:'group-detail',component:GroupDetailComponent},
  { path:'group-form',component:AddGroupComponent},
  { path:'group-form/:id',component:AddGroupComponent},
  { path:'room-detail',component:RoomDetailComponent},
  { path:'room-form',component:AddRoomComponent},
  { path:'room-form/:id',component:AddRoomComponent},
  { path:'dashboard',component:DashboardComponent},
  { path:'utility-detail',component:UtilityDetailComponent},
  { path:'add-utility',component:AddUtilityComponent},
  { path:'add-utility/:id',component:AddUtilityComponent},
  { path:'equipment-data',component:EquipmentDetailComponent},
  { path: 'add-equipment',component:AddEquipmentComponent},
  { path: 'add-equipment/:id',component:AddEquipmentComponent},
  { path:'package',component:PackageComponent},
  { path:'add-package',component:AddPackageComponent},
  { path:'add-package/:id',component:AddPackageComponent},
  { path:'hospital-data',component:HospitalClassificationComponent},
  { path:'add-classification',component:AddClassificationComponent},
  { path:'add-classification/:id',component:AddClassificationComponent},
  { path:'currency',component:CurrencyComponent},
  { path:'add-currency',component:AddCurrencyComponent} ,
  { path:'add-currency/:id',component:AddCurrencyComponent},
  {path:'project-template', component:ProjectTemplateComponent},
  {path:'Project-newtemplate', component:ProjectNewtemplateComponent},
  {path:'Project-newtemplate/:id', component:ProjectNewtemplateComponent},

  {path:'project', component:ProjectComponent},
  {path:'add-project', component:AddProjectComponent},
  {path:'equipment-allocation', component: EquipmentAllocationComponent},
  {path:'equipment-summary', component:EquipmentSummaryComponent},
  {path:'department-transaction', component:DepartmentTransactionComponent},
  {path:'past-transaction', component:PastTransactionComponent},
  {path:'edit-project', component:ProjectEditComponent},
  {path:'edit-project/:id', component:ProjectEditComponent},
  {path:'reports', component:ReportsComponent},
  {path:'specification', component:EquipmentSpecificationComponent},
  {path:'brand', component:EquipmentBrandComponent},
  {path:'reports-by-package', component:ReportsByPackageComponent},
  {path:'template-department', component:TemplateDepartmentComponent},
  {path:'edit-admin-user', component:EditAdminUserComponent},
  {path:'view-rooms', component:ViewRoomsComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingcomponents = [ SignupComponent,LoginComponent, HeaderComponent,ForgetpasswordComponent,
  AdminUserComponent,UserFormComponent, AdminGroupComponent, AdminGroupFormComponent, AccessLevelComponent,
  ActivityLogComponent,CompanydetailComponent,CompanyFormComponent, DepartmentComponent,
  AddDepartmentComponent,GroupDetailComponent, AddGroupComponent, RoomDetailComponent, AddRoomComponent,
  DashboardComponent,UtilityDetailComponent, AddUtilityComponent, EquipmentDetailComponent,AddEquipmentComponent,
  PackageComponent , AddPackageComponent, HospitalClassificationComponent,AddClassificationComponent, CurrencyComponent,
  AddCurrencyComponent, ProjectTemplateComponent, ProjectNewtemplateComponent

]
