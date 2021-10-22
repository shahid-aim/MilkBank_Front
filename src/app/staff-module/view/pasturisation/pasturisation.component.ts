import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { CreatePasturization, Paginator, PasturizationPaginator} from '../../models/phase';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-pasturisation',
  templateUrl: './pasturisation.component.html',
  styleUrls: ['./pasturisation.component.css']
})
export class PasturisationComponent implements OnInit {
  [x: string]: any;
 

  pasturizationPaginator : PasturizationPaginator = new PasturizationPaginator() 

  constructor(private _dashboardService : DashboardService) { }

  ngOnInit(): void {
    this.pasturizationPaginator.page_start=0
    this.pasturizationPaginator.page_end=10
    this.pasturizationPaginator.screen = "post"
    this._dashboardService.changeScreenTitle("Pasturization")
    this.token = localStorage.getItem("token")
    this.getPasturization()
  }

  

  getPasturization() {
    this._dashboardService.getPasturization(this.token, this.pasturizationPaginator).subscribe(response => {
      this.pasturizationData = response.pasturization_obj
      console.log(this.pasturizationData)
      console.log(this.pasturizationPaginator)
    },
      error => {
        if (error.status == 401) {
          this._dashboardService.logoutUser()
        }
      })
  }



}
