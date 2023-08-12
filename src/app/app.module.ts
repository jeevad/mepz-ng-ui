import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingcomponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FilterRoomsPipe } from './pipes/filter-rooms.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoomSelectionModalComponent } from './pages/project/view-rooms/room-selection-modal.component';
import { AlertComponent } from './_components';
import { ErrorInterceptor, JwtInterceptor, appInitializer, fakeBackendProvider } from './_helpers';
import { AccountService } from './_services/account.service';

@NgModule({
  declarations: [
    AppComponent,
    routingcomponents,
    FilterRoomsPipe,
    RoomSelectionModalComponent,
    AlertComponent,
  ],
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

  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
