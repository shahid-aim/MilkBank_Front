import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardService } from './services/dashboard.service';
import { InternalUrlMappings } from './shared/UrlMapping';

@Component({
  selector: 'app-staff-module',
  templateUrl: './staff-module.component.html',
  styleUrls: ['./staff-module.component.css']
})
export class StaffModuleComponent implements OnInit {

  screenTitle: String = "";
  subscription : Subscription;

  tab : any = 'tab1'

  constructor(private _dashboardService: DashboardService, private _router: Router) { }

  ngOnInit(): void {
    this.subscription = this._dashboardService.currentScreenTitle.subscribe(screenTitle => this.screenTitle = screenTitle)
   
  
  }
 
  routeAndClose(routeTo: string) {
  

    if (routeTo == "dashboard") {
      this.screenTitle = "Dashboard"
      this._router.navigateByUrl("staff/" + InternalUrlMappings.DASHBOARD)
    }
    else if (routeTo == "raw-collection")
      this._router.navigateByUrl("staff/" + InternalUrlMappings.RAW_COLLECTION)
    else if (routeTo == "pooling")
      this._router.navigateByUrl("staff/" + InternalUrlMappings.POOLING)
    else if (routeTo == "pasturization")
      this._router.navigateByUrl("staff/" + InternalUrlMappings.PASTURIZATION)
    else if (routeTo == "pre-pasturization")
      this._router.navigateByUrl("staff/" + InternalUrlMappings.PRE_PASTURIZAION)
    else if (routeTo == "bottling")
      this._router.navigateByUrl("staff/" + InternalUrlMappings.BOTTLING)
    else if (routeTo == "logout") {
      this._dashboardService.logoutUser()
    }

    
  }
  onClick(check : any){
   
        if(check==1){
          this.tab = 'tab1';
        }else if(check==2){
          this.tab = 'tab2';
        }else if(check==3){
          this.tab = 'tab3';
        }else if(check==4){
          this.tab = 'tab4';
        }else if(check==5){
          this.tab = 'tab5';
        }else if(check==6){
          this.tab = 'tab6';
        }else if(check==7){
          this.tab = 'tab7'
        }
       
      
    }
  
    
}

