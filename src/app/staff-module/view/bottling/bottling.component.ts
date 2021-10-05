import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { createBottling} from '../../models/phase';
import { DashboardService } from '../../services/dashboard.service';


@Component({
  selector: 'app-bottling',
  templateUrl: './bottling.component.html',
  styleUrls: ['./bottling.component.css']
})
export class BottlingComponent implements OnInit {
@ViewChild("bottlingForm" ) bottlingForm:ModalDirective
@ViewChild("DonorDetailModal") DonorDetailModal:ModalDirective
@ViewChild("bottlepool") bottlepool:ModalDirective
@ViewChild("bottles") bottles:ModalDirective
@ViewChild("bottle123")bottle123 :ModalDirective

selectedPool : any;

  bottleData : any  = "";
  bottleHeader : any = "";
  searchString : string = "";
  token: string;

  pasturizationHeader:any;
  pasturizationData:any;

  
  removeIdIndex : number
  poolArray : number[] = []

  
  createBottlingModal : createBottling = new  createBottling()

  constructor(private _dashbordService : DashboardService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token")
  
  }
//  API call

  
  // getBottlePool(){
  //  this._dashbordService.getBottle(this.token).subscribe(resp =>{
  //    this.bottleHeader = resp.table_header
  //    this.bottleData = resp.pool_obj
  //  },
  //  error =>{
  //    if(error.status ==401){
  //      this._dashbordService.logoutUser()
  //    }
   
  //  })  
   
  // }

  // getBottling(){
  //   this._dashbordService.getBottling(this.token).subscribe(response => {
  //     this.bottleHeader = response.table_header
  //     this.bottleData = response.bottling_obj
  //   },
  //   error =>{
  //     if(error.status == 401){
  //        this._dashbordService.logoutUser()
  //     }
  //   })

  //  }

   CreateBottling(){
    this._dashbordService.createBottling(this.token,this.createBottlingModal).subscribe(response => {
      this.bottlingForm.hide()
    
    },
    error =>{
      if(error.status == 401){
        this._dashbordService.logoutUser()
      }
    })
   }

  showDonorDetailModal(){
    this.DonorDetailModal.show();
  }

  selectHideBottlePool(){
    this.createBottlingModal.pasturization_id ,this.selectedPool
    this.bottlepool.hide()

  }
  AddBottlePool(){
    this.createBottlingModal,this.selectedPool
    this.bottles.hide()
  }

  selectHideBottlePool123(){
   this.createBottlingModal,this.selectedPool
   this.bottle123.hide()
   }


  showBottelPool(){
    this.bottlepool.show()
  }
  showBottles()
  {
    this.bottles.show()
  }
  openCollectionForm(){
    this.bottlingForm.show()
  }

  showBottle123(){
  this.bottle123.show()
}


selectPoolArray(id : number){
  this.removeIdIndex = this.poolArray.indexOf(id)
  if (this.removeIdIndex == -1) {
    this.poolArray.push(id)
  }
  else{
    this.poolArray.splice(this.removeIdIndex, 1)
  }
  console.log(this.poolArray)
}
}
