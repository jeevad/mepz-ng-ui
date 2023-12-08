import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { CompanydetailComponent } from './companydetail/companydetail.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { DepartmentComponent } from './department/department.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { UtilityDetailComponent } from './utility-detail/utility-detail.component';
import { AddUtilityComponent } from './add-utility/add-utility.component';
// import { EquipmentDetailComponent } from './equipment-detail/equipment-detail.component';
// import { AddEquipmentComponent } from './add-equipment/add-equipment.component';
import { PackageComponent } from './package/package.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { HospitalClassificationComponent } from './hospital-classification/hospital-classification.component';
import { AddClassificationComponent } from './add-classification/add-classification.component';
import { CurrencyComponent } from './currency/currency.component';
import { AddCurrencyComponent } from './add-currency/add-currency.component';
// import { ProjectTemplateComponent } from './project-template/project-template.component';
// import { ProjectNewtemplateComponent } from './project-newtemplate/project-newtemplate.component';
import { ProjectComponent } from './project/project.component';
import { EquipmentAllocationComponent } from './unused/equipment-allocation/equipment-allocation.component';
import { EquipmentSummaryComponent } from './project/equipment-summary/equipment-summary.component';
import { DepartmentTransactionComponent } from './project/department-transaction/department-transaction.component';
import { PastTransactionComponent } from './project/past-transaction/past-transaction.component';
import { ReportsComponent } from './reports/reports.component';
// import { EquipmentSpecificationComponent } from './equipment-specification/equipment-specification.component';
import { ReportsByPackageComponent } from './reports-by-package/reports-by-package.component';
// import { TemplateDepartmentComponent } from './template-department/template-department.component';
import { EditAdminUserComponent } from './edit-admin-user/edit-admin-user.component';
import { ViewRoomsComponent } from './project/view-rooms/view-rooms.component';
import { TransactionViewComponent } from './project/transaction-view/transaction-view.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
// import { ProjectTemplateEquipmentComponent } from './project-template-equipment/project-template-equipment.component';
import { EquipmentListComponent } from './project/equipment-list/equipment-list.component';
// import { EditEquipmentComponent } from './edit-equipment/edit-equipment.component';
import { UserFormComponent } from './administrator/users/user-form/user-form.component';
import { AdminUserComponent } from './administrator/users/admin-user/admin-user.component';
import { AdminGroupComponent } from './administrator/group/admin-group/admin-group.component';
import { AdminGroupFormComponent } from './administrator/group/admin-group-form/admin-group-form.component';
import { ActivityLogComponent } from './administrator/activity-log/activity-log.component';
import { AccessLevelComponent } from './administrator/access-level/access-level.component';
import { EquipmentDetailComponent } from './master-file/equipments/equipment-detail/equipment-detail.component';
import { EquipmentSpecificationComponent } from './master-file/equipments/equipment-specification/equipment-specification.component';
import { EquipmentBrandComponent } from './master-file/equipments/equipment-brand/equipment-brand.component';
import { EditEquipmentComponent } from './master-file/equipments/edit-equipment/edit-equipment.component';
import { AddEquipmentComponent } from './master-file/equipments/add-equipment/add-equipment.component';
import { TacComponent } from './project/tac/tac.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin-user', component: AdminUserComponent },
  { path: 'add-admin-user', component: UserFormComponent },
  { path: 'add-admin-user/:id', component: UserFormComponent },
  { path: 'admin-group', component: AdminGroupComponent },
  { path: 'admin-group-form/:id', component: AdminGroupFormComponent },
  { path: 'admin-group-form', component: AdminGroupFormComponent },
  { path: 'access-level', component: AccessLevelComponent },
  { path: 'activity-log', component: ActivityLogComponent },
  { path: 'company', component: CompanydetailComponent },
  { path: 'company-form', component: CompanyFormComponent },
  { path: 'company-form/:id', component: CompanyFormComponent },
  { path: 'department', component: DepartmentComponent },
  { path: 'department-form', component: AddDepartmentComponent },
  { path: 'department-form/:id', component: AddDepartmentComponent },
  { path: 'group-detail', component: GroupDetailComponent },
  { path: 'group-form', component: AddGroupComponent },
  { path: 'group-form/:id', component: AddGroupComponent },
  { path: 'room-detail', component: RoomDetailComponent },
  { path: 'room-form', component: AddRoomComponent },
  { path: 'room-form/:id', component: AddRoomComponent },
  { path: 'utility-detail', component: UtilityDetailComponent },
  { path: 'add-utility', component: AddUtilityComponent },
  { path: 'add-utility/:id', component: AddUtilityComponent },
  { path: 'equipment-data', component: EquipmentDetailComponent },
  { path: 'add-equipment', component: AddEquipmentComponent },
  { path: 'add-equipment/:id', component: AddEquipmentComponent },
  { path: 'package', component: PackageComponent },
  { path: 'add-package', component: AddPackageComponent },
  { path: 'add-package/:id', component: AddPackageComponent },
  { path: 'hospital-data', component: HospitalClassificationComponent },
  { path: 'add-classification', component: AddClassificationComponent },
  { path: 'add-classification/:id', component: AddClassificationComponent },
  { path: 'currency', component: CurrencyComponent },
  { path: 'add-currency', component: AddCurrencyComponent },
  { path: 'add-currency/:id', component: AddCurrencyComponent },
  // { path: 'project-template', component: ProjectTemplateComponent },
  // { path: 'project-newtemplate', component: ProjectNewtemplateComponent },
  // { path: 'projects-newtemplate/:id', component: ProjectNewtemplateComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'specification', component: EquipmentSpecificationComponent },
  { path: 'brand', component: EquipmentBrandComponent },
  { path: 'reports-by-package', component: ReportsByPackageComponent },
  // { path: 'template-department', component: TemplateDepartmentComponent },
  { path: 'edit-admin-user', component: EditAdminUserComponent },
  { path: 'edit-equipment', component: EditEquipmentComponent },
  { path: 'edit-equipment/:id', component: EditEquipmentComponent },

  {
    path: 'projects',
    component: ProjectComponent,
    children: [
      { path: '', component: ProjectListComponent },
      { path: 'add', component: AddProjectComponent },
      { path: 'edit/:id', component: ProjectEditComponent },
      {
        path: ':projectId/equipment-summary',
        component: EquipmentSummaryComponent,
      },
      {
        path: ':projectId/past-transaction',
        component: PastTransactionComponent,
      },
      {
        path: ':projectId/department-transaction',
        component: DepartmentTransactionComponent,
      },
      { path: ':projectId/equipment-list', component: EquipmentListComponent },
      // { path: 'project-template-equipment-allocation', component: ProjectTemplateEquipmentComponent },
      // { path: ':projectId/project-template-equipment-allocation', component: ProjectTemplateEquipmentComponent },
      { path: 'transaction-view', component: TransactionViewComponent },
      {
        path: ':projectId/department-transaction/:deptId/view-rooms',
        component: ViewRoomsComponent,
      },
      //project template
      { path: ':projectType/list', component: ProjectListComponent },
      { path: ':projectType/add', component: AddProjectComponent },
      { path: ':projectType/edit/:id', component: ProjectEditComponent },
      {
        path: ':projectType/:projectId/department-transaction',
        component: DepartmentTransactionComponent,
      },
      {
        path: ':projectType/:projectId/department-transaction/:deptId/view-rooms',
        component: ViewRoomsComponent,
      },

      {
        path: ':projectType/:projectId/equipment-summary',
        component: EquipmentSummaryComponent,
      },
      {
        path: ':projectType/:projectId/equipment-list',
        component: EquipmentListComponent,
      },
      // { path: ':projectType/:projectId/project-template-equipment-allocation', component: ProjectTemplateEquipmentComponent },
      {
        path: ':projectType/:projectId/past-transaction',
        component: PastTransactionComponent,
      },
      {
        path: ':projectType/transaction-view',
        component: TransactionViewComponent,
      },
      {
        path: ':projectType/:projectId/tac',
        component: TacComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}

export const routingcomponents = [
  AdminUserComponent,
  UserFormComponent,
  AdminGroupComponent,
  AdminGroupFormComponent,
  AccessLevelComponent,
  ActivityLogComponent,
  CompanydetailComponent,
  CompanyFormComponent,
  DepartmentComponent,
  AddDepartmentComponent,
  GroupDetailComponent,
  AddGroupComponent,
  RoomDetailComponent,
  AddRoomComponent,
  DashboardComponent,
  UtilityDetailComponent,
  AddUtilityComponent,
  EquipmentDetailComponent,
  AddEquipmentComponent,
  PackageComponent,
  AddPackageComponent,
  HospitalClassificationComponent,
  AddClassificationComponent,
  CurrencyComponent,
  AddCurrencyComponent,
  ReportsComponent,
  // ProjectTemplateComponent,
  // ProjectNewtemplateComponent,
  ProjectComponent,
  AddProjectComponent,
  ProjectEditComponent,
  EquipmentAllocationComponent,
  EquipmentSummaryComponent,
  DepartmentTransactionComponent,
  PastTransactionComponent,
  ViewRoomsComponent,
  EquipmentListComponent,
  EditEquipmentComponent,
  ProjectListComponent,
  EquipmentBrandComponent,
  EquipmentSpecificationComponent
  // ProjectTemplateEquipmentComponent
];
