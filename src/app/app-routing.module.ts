import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Registration1Component } from './Components/registration1/registration1.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { HomeComponent } from './View/home/home.component';

const routes: Routes = [
  { path: '', component:HomeComponent },
  {path:'registration1',component:Registration1Component},
  {path:'thankyou',component:ThankYouComponent},
  {path:'login',component:LoginFormComponent},
  {path:'registration-form',component:RegistrationFormComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
