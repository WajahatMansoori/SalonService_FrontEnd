import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacilitatorComponent } from './facilitator/facilitator.component';
import { AppComponent } from './app.component';
import { SalonServicesComponent } from './salon-services/salon-services.component';

const routes: Routes = [

 
  { path: 'Facilitator', component: FacilitatorComponent },
  { path: 'Service', component: SalonServicesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
