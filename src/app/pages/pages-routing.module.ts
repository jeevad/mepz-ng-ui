import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { AdminGroupComponent } from './admin-group/admin-group.component';
import { AdminGroupFormComponent } from './admin-group-form/admin-group-form.component';

import { AccessLevelComponent } from './access-level/access-level.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';
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
import { EquipmentDetailComponent } from './equipment-detail/equipment-detail.component';
import { AddEquipmentComponent } from './add-equipment/add-equipment.component';
import { PackageComponent } from './package/package.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { HospitalClassificationComponent } from './hospital-classification/hospital-classification.component';
import { AddClassificationComponent } from './add-classification/add-classification.component';
import { CurrencyComponent } from './currency/currency.component';
import { AddCurrencyComponent } from './add-currency/add-currency.component';
import { ProjectTemplateComponent } from './project-template/project-template.component';
import { ProjectNewtemplateComponent } from './project-newtemplate/project-newtemplate.component';
import { ProjectComponent } from './project/project.component';
import { EquipmentAllocationComponent } from './equipment-allocation/equipment-allocation.component';
import { EquipmentSummaryComponent } from './equipment-summary/equipment-summary.component';
import { DepartmentTransactionComponent } from './department-transaction/department-transaction.component';
import { PastTransactionComponent } from './past-transaction/past-transaction.component';
import { ReportsComponent } from './reports/reports.component';
import { EquipmentSpecificationComponent } from './equipment-specification/equipment-specification.component';
import { EquipmentBrandComponent } from './equipment-brand/equipment-brand.component';
import { ReportsByPackageComponent } from './reports-by-package/reports-by-package.component';
import { TemplateDepartmentComponent } from './template-department/template-department.component';
import { EditAdminUserComponent } from './edit-admin-user/edit-admin-user.component';
import { ViewRoomsComponent } from './view-rooms/view-rooms.component';
import { TransactionViewComponent } from './transaction-view/transaction-view.component';
import { DeletedialogComponent } from './deletedialog/deletedialog.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';
import { AddProjectComponent } from './project/add-project/add-project.component';

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
  { path: 'project-template', component: ProjectTemplateComponent },
  { path: 'Project-newtemplate', component: ProjectNewtemplateComponent },
  { path: 'Project-newtemplate/:id', component: ProjectNewtemplateComponent },
  {
    path: 'projects',
    component: ProjectComponent,
    children: [
      {
        path: '',
        component: ProjectListComponent,
      },
      { path: 'add', component: AddProjectComponent },
      { path: 'edit/:id', component: ProjectEditComponent },
      {
        path: 'department-transaction/:projectId',
        component: DepartmentTransactionComponent,
      },
      {
        path: 'view-rooms/:projectId/:departmentId/',
        component: DepartmentTransactionComponent,
      },
      {
        path: 'equipment-allocation/:projectId/:departmentId/:roomId',
        component: EquipmentAllocationComponent,
      },
      {
        path: 'equipment-summary/:projectId',
        component: EquipmentSummaryComponent,
      },
    ],
  },

  { path: 'equipment-allocation', component: EquipmentAllocationComponent },
  { path: 'equipment-summary', component: EquipmentSummaryComponent },
  {
    path: 'project/:projectId/department-transaction/projectId/view-rooms',
    component: DepartmentTransactionComponent,
  },
  { path: 'past-transaction', component: PastTransactionComponent },
  {
    path: 'project/:projectId/past-transaction',
    component: PastTransactionComponent,
  },
  {
    path: 'project/:projectId/past-transaction/projectId/transaction-view',
    component: PastTransactionComponent,
  },

  { path: 'reports', component: ReportsComponent },
  { path: 'specification', component: EquipmentSpecificationComponent },
  { path: 'brand', component: EquipmentBrandComponent },
  { path: 'reports-by-package', component: ReportsByPackageComponent },
  { path: 'template-department', component: TemplateDepartmentComponent },
  { path: 'edit-admin-user', component: EditAdminUserComponent },
  { path: 'view-rooms', component: ViewRoomsComponent },
  { path: 'transaction-view', component: TransactionViewComponent },
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
  ProjectTemplateComponent,
  ProjectNewtemplateComponent,
  DeletedialogComponent,
  ReportsComponent,
  ProjectTemplateComponent,
  ProjectNewtemplateComponent,
  ProjectComponent,
  AddProjectComponent,
  EquipmentAllocationComponent,
  EquipmentSummaryComponent,
  DepartmentTransactionComponent,
  PastTransactionComponent,
  ProjectEditComponent,
];
