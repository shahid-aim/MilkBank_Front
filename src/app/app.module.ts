import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ThankYouComponent } from './donor-view/thank-you/thank-you.component';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { DonorRegistrationComponent } from './donor-view/donor-registration/donor-registration.component';
import { RegistrationComponent } from './view/registration/registration.component';
import { DragFileComponent } from './drag-file/drag-file.component';
import { DropFileComponent } from './drop-file/drop-file.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DonorProfileComponent } from './donor-view/donor-profile/donor-profile.component';





@NgModule({
  declarations: [
    AppComponent,
    ThankYouComponent,
    HomeComponent,
    LoginComponent,
    DonorRegistrationComponent,
    RegistrationComponent,
    DragFileComponent,
    DropFileComponent,
    DonorProfileComponent,
    
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ModalModule,
    NgxFileDropModule,

    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
