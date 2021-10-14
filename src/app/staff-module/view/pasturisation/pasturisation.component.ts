import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { CreatePasturization, Paginator, TestResult } from '../../models/phase';
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
  
  removeIdIndex : number
  poolArray : number[] = []

  poolData : any;
  poolHeader :any;
  
  createPasturizationModal : CreatePasturization = new CreatePasturization()
  pagination : Paginator =new Paginator()

  constructor(private _dashboardService : DashboardService) { }

  ngOnInit(): void {
    this.pagination.page_start=0
    this.pagination.page_end=10

    this._dashboardService.changeScreenTitle("Pasturization")
    this.token = localStorage.getItem("token")
    this.getPasturization()
    this.getPool()
  }

  // Api Call

  getPool(){
    this._dashboardService.getPool(this.token ,this.pagination).subscribe(resp => {
      this.poolHeader = resp.table_header
      this.poolData = resp.pool_obj
      console.log("pagination",resp)
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
      console.log("pasturization data -> ", response)
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
      this.createPasturizationModal = new CreatePasturization()
      let el = <HTMLInputElement>document.getElementById("poolCheckBox");
      el.checked = false
      this.poolArray = []
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
    this.createPasturizationModal.pooling = this.poolArray
    console.log(this.createPasturizationModal);
    this.poolModal.hide()
  }

  selectPoolArray(id : number){
    this.removeIdIndex = this.poolArray.indexOf(id)
    if (this.removeIdIndex == -1) {
      this.poolArray.push(id)
    }
    else{
      this.poolArray.splice(this.removeIdIndex, 1)
    }
  }

}
