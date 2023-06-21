import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingcomponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { DeletedialogComponent } from './pages/deletedialog/deletedialog.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { FilterRoomsPipe } from './pipes/filter-rooms.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoomSelectionModalComponent } from './pages/project/view-rooms/room-selection-modal.component';



@NgModule({
  declarations: [AppComponent, routingcomponents, FilterRoomsPipe, RoomSelectionModalComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    // NgbModule.forRoot(),
    CollapseModule.forRoot(),
  ],
  // exports: [NgbModule,
  //   FormsModule,
  //   NgbCollapseModule,
  //   HttpClientModule,
  //   DataTablesModule,
  //   ReactiveFormsModule,
  //   MatNativeDateModule,
  //   ReactiveFormsModule,
  //   MatToolbarModule,
  //   MatButtonModule,
  //   MatDialogModule,
  //   MatInputModule,
  //   ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
