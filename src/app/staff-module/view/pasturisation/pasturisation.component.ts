import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { CreatePasturization, TestResult } from '../../models/phase';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-pasturisation',
  templateUrl: './pasturisation.component.html',
  styleUrls: ['./pasturisation.component.css']
})
export class PasturisationComponent implements OnInit {
  [x: string]: any;
 
  @ViewChild("pasturizationForm") pasturizationForm: ModalDirective;
  @ViewChild("donorDetailModal") donorDetailModal: ModalDirective;
  @ViewChild("poolModal") poolModal:ModalDirective
 
  term:any='';
  pasturizationHeader:any;
  pasturizationData:any;
  searchString:string;
  token : string = "";
  searchTerm : string;
  
  poolData : any;
  poolHeader :any;
  
  
  createPasturizationModal : CreatePasturization = new CreatePasturization()
 
  constructor(private _dashboardService : DashboardService) { }

  
  ngOnInit(): void {
    this.token = localStorage.getItem("token")
    this.getPasturization()
    this.getPool()
  }

  // Api Call

  getPool(){
    this._dashboardService.getPool(this.token).subscribe(resp => {
      this.poolHeader = resp.table_header
      this.poolData = resp.pool_obj
    },
    error => {
      if (error.status == 401) {
        this._dashboardService.logoutUser()
      }
    })
  }


  getPasturization(){
    this._dashboardService.getPasturization(this.token).subscribe(response => {
      this.pasturizationHeader = response.table_headers
      this.pasturizationData = response.pasturization_obj
    },
    error => {
      if (error.status == 401) {
        this._dashboardService.logoutUser()
      }
    })
  }


  createPasturization(){
    this._dashboardService.createPasturization(this.token, this.createPasturizationModal).subscribe(response => {
      this.getPasturization()
      this.pasturizationForm.hide()

    },
    error => {
      if (error.status == 401) {
        this._dashboardService.logoutUser()
      }
    })
  }

  
  openCollectionForm(){
    this.pasturizationForm.show()
  }

  showDonorDetailModal(){
    console.log("Firided");
    this.donorDetailModal.show()
  }

  showPoolModal(){
    this.poolModal.show()
  }

  seleceHidePool(){
    this.createPasturizationModal.pooling = this.selectedPool
    this.poolModal.hide()
  }

}
