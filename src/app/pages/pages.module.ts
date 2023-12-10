import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule, routingcomponents } from './pages-routing.module';
import { NgbDropdownModule, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilterPipe } from '../pipes/filter.pipe';
import { EditInputComponent } from './project/edit-input/edit-input.component';
import { EditModeDirective } from './project/edit-input/edit-mode.directive';
import { ViewModeDirective } from './project/edit-input/view-mode.directive';
import { FocusableDirective } from '../directives/focusable.directive';
import { LoaderComponent } from '../components/loader/loader.component';
import { EditInputEquipmentComponent } from './project/edit-input-equipment/edit-input-equipment.component';
import { TacComponent } from './project/tac/tac.component';
import { ResizeColumnDirective } from '@app/directives/resize-column.directive';
import {MatTableModule} from '@angular/material/table';
import { CdkColumnDef } from '@angular/cdk/table';
import { ColumnResizeDirective } from '@app/directives/column-resize.directive';
// import { EditEquipmentComponent } from './edit-equipment/edit-equipment.component';

@NgModule({
  declarations: [
    routingcomponents,
    FilterPipe,
    EditInputComponent,
    EditInputEquipmentComponent,
    ViewModeDirective,
    EditModeDirective,
    FocusableDirective,
    TacComponent,
    ResizeColumnDirective,
    ColumnResizeDirective,
    // EquipmentListComponent,
    // EditEquipmentComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    PagesRoutingModule,
    MatFormFieldModule,
    NgIf,
    MatIconModule,
    LoaderComponent,
    ReactiveFormsModule,
    MatTableModule,
    NgbTooltipModule,
  ],
  providers:[CdkColumnDef]
})
export class PagesModule {}
