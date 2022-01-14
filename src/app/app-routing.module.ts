import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacilitatorComponent } from './facilitator/facilitator.component';
import { AppComponent } from './app.component';
import { SalonServicesComponent } from './salon-services/salon-services.component';
import { SalonProductManagementComponent } from './salon-product-management/salon-product-management.component';
import { InvoicesComponent } from './invoices/invoices.component';

const routes: Routes = [

 
  { path: 'Facilitator', component: FacilitatorComponent },
  { path: 'Service', component: SalonServicesComponent },
  { path: 'SalonProduct', component: SalonProductManagementComponent },
  { path: 'Invoice', component: InvoicesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
