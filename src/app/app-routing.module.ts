import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BookingComponent } from './booking/booking.component';
import { ServicesComponent } from './services/services.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { MyordersComponent } from './myorders/myorders.component';
import { MyappointmentsComponent } from './myappointments/myappointments.component';

const routes: Routes = [{
  path: '', component: HomeComponent
},

{
  path: 'login', component: LoginComponent
},
{
  path: 'signup', component: SignupComponent

},
{
  path: 'services', component: ServicesComponent,


},
{
  path: 'my-appointments', component: MyappointmentsComponent
},
{
  path: 'my-orders', component: MyordersComponent
},
{
  path: 'services/medicines', component: MedicinesComponent
},
{
  path: 'medical-appointment', component: BookingComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
