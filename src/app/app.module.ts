import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingcomponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { HttpClientModule} from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { ProjectTemplateComponent } from './pages/project-template/project-template.component';
import { ProjectNewtemplateComponent } from './pages/project-newtemplate/project-newtemplate.component';
import { ProjectComponent } from './pages/project/project.component';
import { AddProjectComponent } from './pages/add-project/add-project.component';
import { EquipmentAllocationComponent } from './pages/equipment-allocation/equipment-allocation.component';
import { EquipmentSummaryComponent } from './pages/equipment-summary/equipment-summary.component';
import { DepartmentTransactionComponent } from './pages/department-transaction/department-transaction.component';
import { PastTransactionComponent } from './pages/past-transaction/past-transaction.component';
import { ProjectEditComponent } from './pages/project-edit/project-edit.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { DeletedialogComponent } from './pages/deletedialog/deletedialog.component';
import { ReportsComponent } from './pages/reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    routingcomponents,
    ProjectTemplateComponent,
    ProjectNewtemplateComponent,
    ProjectComponent,
    AddProjectComponent,
    EquipmentAllocationComponent,
    EquipmentSummaryComponent,
    DepartmentTransactionComponent,
    PastTransactionComponent,
    ProjectEditComponent,
    DeletedialogComponent,
    ReportsComponent,
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgbCollapseModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    CollapseModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
