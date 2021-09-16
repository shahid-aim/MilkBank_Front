import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffModuleRoutingModule } from './staff-module-routing.module';
import { StaffModuleComponent } from './staff-module.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { CollectionComponent } from './view/collection/collection.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PoolingComponent } from './view/pooling/pooling.component';
import { PasturisationComponent } from './view/pasturisation/pasturisation.component';
@NgModule({
  declarations: [
    StaffModuleComponent,
    DashboardComponent,
    CollectionComponent,
    PoolingComponent,
    PasturisationComponent,
  ],
  imports: [
    CommonModule,
    ModalModule,
    StaffModuleRoutingModule,
    Ng2SearchPipeModule,
    FormsModule,
  ]
})
export class StaffModuleModule { }
