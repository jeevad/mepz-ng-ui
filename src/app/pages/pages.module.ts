import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule, routingcomponents } from './pages-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    routingcomponents,
    // EquipmentSpecificationComponent,
    // EquipmentBrandComponent,
    // ReportsByPackageComponent,
    // TemplateDepartmentComponent,
    // EditAdminUserComponent,
    // ViewRoomsComponent,
    // TransactionViewComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    // NgbCollapseModule,
    // HttpClientModule,
    // DataTablesModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    PagesRoutingModule,
  ],
})
export class PagesModule {}
