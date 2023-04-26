import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { EquipmentSpecificationComponent } from './equipment-specification/equipment-specification.component';


@NgModule({
  declarations: [
    EquipmentSpecificationComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
