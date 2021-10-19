import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CreatePasturization, PasturizationPaginator } from '../../models/phase';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-pre-pasturization',
  templateUrl: './pre-pasturization.component.html',
  styleUrls: ['./pre-pasturization.component.css']
})
export class PrePasturizationComponent implements OnInit {

  @ViewChild("pasturizationForm") pasturizationForm: ModalDirective;
  @ViewChild("donorDetailModal") donorDetailModal: ModalDirective;
  @ViewChild("poolModal") poolModal: ModalDirective

  token: string = "";
  pasturizationData: any;


  term: any = '';
  pasturizationHeader: any;
  searchString: string;
  searchTerm: string;

  removeIdIndex: number
  poolArray: number[] = []

  poolData: any;
  poolHeader: any;

  createPasturizationModal: CreatePasturization = new CreatePasturization()
  pasturizationPaginator: PasturizationPaginator = new PasturizationPaginator()
  constructor(private _dashboardService: DashboardService) { }

  ngOnInit(): void {
    this._dashboardService.changeScreenTitle("Pre Pasturization")
    this.token = localStorage.getItem("token")
    this.pasturizationPaginator.page_start = 0
    this.pasturizationPaginator.page_end = 10
    this.pasturizationPaginator.screen = "pre"
    this.getPasturization()
    this.getPool()
  }


  getPasturization() {
    this._dashboardService.getPasturization(this.token, this.pasturizationPaginator).subscribe(response => {
      this.pasturizationData = response.pasturization_obj
      // console.log("pre pasturization data -> ", response)
    },
      error => {
        if (error.status == 401) {
          this._dashboardService.logoutUser()
        }
      })
  }

  // Api Call

  getPool() {
    this._dashboardService.getPool(this.token, this.pasturizationPaginator).subscribe(resp => {
      this.poolData = resp.pool_obj
      console.log("pool - >", resp)
    },
      error => {
        if (error.status == 401) {
          this._dashboardService.logoutUser()
        }
      })
  }



  createPasturization() {
    this.createPasturizationModal.pooling = this.poolArray
    console.log("Creating -> ", this.poolArray)
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

  openCollectionForm() {
    this.pasturizationForm.show()
  }

  showDonorDetailModal() {
    console.log("Firided");
    this.donorDetailModal.show()
  }

  showPoolModal() {
    this.poolModal.show()
  }

  seleceHidePool() {
    this.createPasturizationModal.pooling = this.poolArray
    console.log(this.createPasturizationModal);
    this.poolModal.hide()
  }

  selectPoolArray(id: number) {

    console.log("Id -> ", id);
    

    this.removeIdIndex = this.poolArray.indexOf(id)
    if (this.removeIdIndex == -1) {
      this.poolArray.push(id)
    }
    else {
      this.poolArray.splice(this.removeIdIndex, 1)
    }

    console.log("Pool Array", this.poolArray);
    

  }

}
