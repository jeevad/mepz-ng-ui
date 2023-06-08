import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule, routingcomponents } from './pages-routing.module';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectTemplateEquipmentComponent } from './project-template-equipment/project-template-equipment.component';

@NgModule({
  declarations: [
    routingcomponents,
    ProjectListComponent,
    ProjectTemplateEquipmentComponent,
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
    NgbDropdownModule,
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
