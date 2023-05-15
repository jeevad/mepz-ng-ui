import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { EquipmentSpecificationComponent } from './equipment-specification/equipment-specification.component';
import { EquipmentBrandComponent } from './equipment-brand/equipment-brand.component';
import { ReportsByPackageComponent } from './reports-by-package/reports-by-package.component';
import { TemplateDepartmentComponent } from './template-department/template-department.component';
import { EditAdminUserComponent } from './edit-admin-user/edit-admin-user.component';
import { ViewRoomsComponent } from './view-rooms/view-rooms.component';
import { TransactionViewComponent } from './transaction-view/transaction-view.component';

@NgModule({
  declarations: [
    EquipmentSpecificationComponent,
    EquipmentBrandComponent,
    ReportsByPackageComponent,
    TemplateDepartmentComponent,
    EditAdminUserComponent,
    ViewRoomsComponent,
    TransactionViewComponent,
  ],
  imports: [CommonModule, PagesRoutingModule],
})
export class PagesModule {}
