import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CreateBottling, PasturizationPaginator } from '../../models/phase';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-bottling',
  templateUrl: './bottling.component.html',
  styleUrls: ['./bottling.component.css']
})
export class BottlingComponent implements OnInit {
  @ViewChild("pasturizationModal") pasturizationModal: ModalDirective
  @ViewChild("staffDetailModal") staffDetailModal: ModalDirective;
  @ViewChild("bottleModal") bottleModal: ModalDirective
  @ViewChild("pasturizationPoolModal") pasturizationPoolModal: ModalDirective

  @ViewChild("bottlingForm") bottlingForm: ModalDirective
  
  selectedPool: any;

  bottleData: any = "";
  bottleHeader: any = "";

  searchString: string = "";
  token: string;
  
  selectedStaff: string

  pasturizationHeader: any;
  pasturizationData: any;
  pasturizationNativeId : string

  removeIdIndex: number

  poolArray: number[] = []
  selectedPoolId : string
  nativeSelectedPoolId : number
  selectedPoolVolume : number
  valueLessThanZero : boolean = false


  staffHeader: any
  staffData: any

  

  selectedStaffName : string

  past_pool_obj : any

  createBottlingModal: CreateBottling = new CreateBottling()
  pasturizationPaginator : PasturizationPaginator = new PasturizationPaginator()


  constructor(private _dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.pasturizationPaginator.page_start = 0
    this.pasturizationPaginator.page_end = 10
    this.pasturizationPaginator.screen = "post"
    this._dashboardService.changeScreenTitle("Bottling")
    this.token = localStorage.getItem("token")
    this.getPasturization()
    this.getStaff()
    this.getBottle()
  }
  
  createBottling(){
    this._dashboardService.createBottle(this.token, this.createBottlingModal).subscribe(resp => {
      this.getBottle()
      this.bottleModal.hide()
      this.bottlingForm.hide()
    })
  }

  getBottle(){
    this._dashboardService.getBottle(this.token).subscribe(resp => {
      this.bottleData = resp.bottle_obj
    })
  }


  getPasturization(){
    this._dashboardService.getPasturization(this.token, this.pasturizationPaginator).subscribe(response => {
      this.pasturizationHeader = response.table_headers
      this.pasturizationData = response.pasturization_obj
      console.log(this.pasturizationData);
      
    },
    error => {
      if (error.status == 401) {
        this._dashboardService.logoutUser()
      }
    })
  }

  getStaff() {
    this._dashboardService.getStaff(this.token).subscribe(response => {
      console.log("staf", response);
      this.staffHeader = response.table_headers
      this.staffData = response.staff_obj
    },
      error => {
        if (error.status == 401) {
          this._dashboardService.logoutUser()
        }
      })
  }

  getPasturizationPool(){
    let pasturization_id = this.createBottlingModal.pasturization_id
    this._dashboardService.getPasturizationPool(this.token, pasturization_id).subscribe(resp => {
      console.log("Psatu pool -> ", resp)
      this.past_pool_obj = resp
      this.pasturizationModal.hide()
      this.bottleModal.show()
    })
  }

  calculateVolumePerBottle(){
    if(this.createBottlingModal.total_volume <= 0){
      this.valueLessThanZero = true
    }
    else{
      this.createBottlingModal.total_units = this.selectedPoolVolume / this.createBottlingModal.total_volume
      console.log(this.createBottlingModal.total_units);
      if (this.createBottlingModal.total_units == NaN || this.createBottlingModal.total_units == Infinity){
        console.log("inside");
        this.createBottlingModal.total_units = null
      }
    }    
  }

  // Model Open Close
  selectPasturization(){
    this.createBottlingModal.pasturization_id = Number(this.pasturizationNativeId)
    this.pasturizationModal.hide()
  }

  selectPasturizationPoolModal(){
    this.createBottlingModal.pool_id = this.nativeSelectedPoolId
    
    for(let element of this.past_pool_obj.pooling_obj){
      if(element.id == this.nativeSelectedPoolId){
        this.selectedPoolVolume = element.total_volume
        break;
      }
    }
    this.pasturizationPoolModal.hide()
  }

  selectIdAndCloseStaffModal() {
    this.createBottlingModal.staff = Number(this.selectedStaff)

    for (let s of this.staffData) {
      if (s.id == this.selectedStaff) {
        this.selectedStaffName = s.staff_full_name
        break
      }
    }
    this.staffDetailModal.hide()
  }

}