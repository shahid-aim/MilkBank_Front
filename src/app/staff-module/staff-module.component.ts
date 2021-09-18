import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './services/dashboard.service';
import { InternalUrlMappings } from './shared/UrlMapping';

@Component({
  selector: 'app-staff-module',
  templateUrl: './staff-module.component.html',
  styleUrls: ['./staff-module.component.css']
})
export class StaffModuleComponent implements OnInit {

  constructor(private _dashboardService : DashboardService, private _router  : Router) { }

  ngOnInit(): void {
  }

  openNav(){
    document.getElementById("mySidenav").style.width = "250px"
  }

  routeAndClose(routeTo : string){
    if(routeTo == "dashboard")
      this._router.navigateByUrl("staff/" + InternalUrlMappings.DASHBOARD)
    else if(routeTo == "raw-collection")
      this._router.navigateByUrl("staff/" + InternalUrlMappings.RAW_COLLECTION)
    else if(routeTo == "pooling")
      this._router.navigateByUrl("staff/" + InternalUrlMappings.POOLING)
    else if(routeTo == "pasturization")
      this._router.navigateByUrl("staff/" + InternalUrlMappings.PASTURIZATION)
    else if(routeTo == "logout"){
      this._dashboardService.logoutUser()
    }
    this.closeNav()
    }
  
  closeNav(){
    document.getElementById("mySidenav").style.width = "0px"
  }

}
