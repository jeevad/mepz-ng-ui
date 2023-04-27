import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { EquipmentSpecificationComponent } from './equipment-specification/equipment-specification.component';
import { EquipmentBrandComponent } from './equipment-brand/equipment-brand.component';
import { ReportsByPackageComponent } from './reports-by-package/reports-by-package.component';


@NgModule({
  declarations: [
    EquipmentSpecificationComponent,
    EquipmentBrandComponent,
    ReportsByPackageComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
