import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternalUrlMappings } from './shared/UrlMapping';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { DragFileComponent } from './drag-file/drag-file.component';
import { DropFileComponent } from './drop-file/drop-file.component';
import { ThankYouComponent } from './donor-view/thank-you/thank-you.component';
import { RegistrationComponent } from './view/registration/registration.component';
import { DonorRegistrationComponent } from './donor-view/donor-registration/donor-registration.component'

import { DonorProfileComponent } from './donor-view/donor-profile/donor-profile.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: InternalUrlMappings.LOGIN, component: LoginComponent },
  { path: InternalUrlMappings.REGISTRATION, component: RegistrationComponent },
  { path: InternalUrlMappings.DONOR_REGISTRATION, component: DonorRegistrationComponent },
  { path: InternalUrlMappings.THANK_YOU, component: ThankYouComponent },
  { path: 'drag-file', component: DragFileComponent },
  { path: 'drop-file', component: DropFileComponent },
  { path: InternalUrlMappings.STAFF, loadChildren: () => import('./staff-module/staff-module.module').then(m => m.StaffModuleModule) },
  {path:InternalUrlMappings.DONOR_PROFILE,component:DonorProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }