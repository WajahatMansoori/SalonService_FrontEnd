import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FacilitatorComponent } from './facilitator/facilitator.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SalonServicesComponent } from './salon-services/salon-services.component';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import { SalonProductManagementComponent } from './salon-product-management/salon-product-management.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { SalonAppointmentComponent } from './salon-appointment/salon-appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    FacilitatorComponent,
    HomeComponent,
    SalonServicesComponent,
    SalonProductManagementComponent,
    InvoicesComponent,
    SalonAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    DialogModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
