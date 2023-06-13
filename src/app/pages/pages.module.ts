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
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectTemplateEquipmentComponent } from './project-template-equipment/project-template-equipment.component';
import { DepartmentTransactionComponent } from './project/department-transaction/department-transaction.component';
import { FilterPipe } from '../pipes/filter.pipe';
import { EditInputComponent } from './project/edit-input/edit-input.component';

@NgModule({
  declarations: [
    routingcomponents,
    ProjectListComponent,
    ProjectTemplateEquipmentComponent,
    DepartmentTransactionComponent,
    FilterPipe,
    EditInputComponent,
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
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
  ],
})
export class PagesModule {}
