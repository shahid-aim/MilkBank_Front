import { Component, OnInit } from '@angular/core';
import { PasturizationPaginator } from '../../models/phase';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-pre-pasturization',
  templateUrl: './pre-pasturization.component.html',
  styleUrls: ['./pre-pasturization.component.css']
})
export class PrePasturizationComponent implements OnInit {

  token : string = "";
  pasturizationData:any;

  pasturizationPaginator : PasturizationPaginator = new PasturizationPaginator() 
  constructor(private _dashboardService : DashboardService) { }

  ngOnInit(): void {
    this._dashboardService.changeScreenTitle("Pre Pasturization")
    this.token = localStorage.getItem("token")
    this.pasturizationPaginator.page_start = 0
    this.pasturizationPaginator.page_end = 10
    this.pasturizationPaginator.screen = "pre"
    this.getPasturization()
  }


  getPasturization(){
    this._dashboardService.getPasturization(this.token, this.pasturizationPaginator).subscribe(response => {
      this.pasturizationData = response.pasturization_obj
      console.log("pre pasturization data -> ", response)
    },
    error => {
      if (error.status == 401) {
        this._dashboardService.logoutUser()
      }
    })
  }

}
