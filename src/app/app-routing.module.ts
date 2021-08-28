import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternalUrlMappings } from './shared/UrlMapping';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { DonorRegistrationComponent } from './donor-view/donor-registration/donor-registration.component' 
import { RegistrationComponent } from './view/registration/registration.component';
import { ThankYouComponent } from './donor-view/thank-you/thank-you.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: InternalUrlMappings.LOGIN, component: LoginComponent },
  { path: InternalUrlMappings.REGISTRATION, component: RegistrationComponent },
  { path: InternalUrlMappings.DONOR_REGISTRATION, component: DonorRegistrationComponent},
  { path: InternalUrlMappings.THANK_YOU, component: ThankYouComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }