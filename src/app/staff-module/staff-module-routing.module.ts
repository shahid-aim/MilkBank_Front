import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternalUrlMappings } from './shared/UrlMapping';
import { StaffModuleComponent } from './staff-module.component';
import { CollectionComponent } from './view/collection/collection.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { PasturisationComponent } from './view/pasturisation/pasturisation.component';
import { PoolingComponent } from './view/pooling/pooling.component';

const routes: Routes = [
  { path: '', component: StaffModuleComponent,
    children: [
      {path : InternalUrlMappings.DASHBOARD, component : DashboardComponent},
      {path : InternalUrlMappings.RAW_COLLECTION, component : CollectionComponent},
      {path : InternalUrlMappings.POOLING, component : PoolingComponent},
      {path: InternalUrlMappings.PASTURIZATION,component:PasturisationComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffModuleRoutingModule { }
