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
import { MainpageComponent } from './mainpage/mainpage.component';
import { AuthGuard } from './auth/auth.guard';

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
  path: 'home', component: HomeComponent
},
{
  path: 'services', component: ServicesComponent, canActivate: [AuthGuard]


},
{
  path: 'my-appointments', component: MyappointmentsComponent, canActivate: [AuthGuard]
},
{
  path: 'my-orders', component: MyordersComponent, canActivate: [AuthGuard]
},
{
  path: 'services/medicines', component: MedicinesComponent, canActivate: [AuthGuard]
},
{
  path: 'medical-appointment', component: BookingComponent, canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
