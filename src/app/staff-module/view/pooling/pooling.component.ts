import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CreatePool, TestResult } from '../../models/phase';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-pooling',
  templateUrl: './pooling.component.html',
  styleUrls: ['./pooling.component.css']
})
export class PoolingComponent implements OnInit {
  @ViewChild("newPool") newPool: ModalDirective;
  @ViewChild("rawCollectionModal") rawCollectionModal: ModalDirective;
  @ViewChild("testResult") testResult: ModalDirective;
  
  
  constructor(private _dashboardService : DashboardService) { }
  
  donor : any
  collectionCheckBox : number[] = []
  collectionCheckBoxString : string
  searchTerm : string
  removeIndex : number

  rawCollectionHeader : any
  rawCollectionData : any
  poolHeader : any
  poolData : any

  selectedPool : number

  createPoolModel : CreatePool = new CreatePool()
  testResultModel : TestResult = new TestResult()
  ngOnInit(): void {
    this.getPool()
    this.getRawCollection()
  }

  // API 

  getPool(){
    this._dashboardService.getPool().subscribe(resp => {
      this.poolHeader = resp.table_header
      this.poolData = resp.pool_obj
      console.log(this.poolData);
      
    })
  }

  createPool(){
    this.createPoolModel.raw_collection_id = this.collectionCheckBox
    this._dashboardService.createPool(this.createPoolModel).subscribe(response => {
      console.log(response)
      this.newPool.hide()
    })
  }

  getRawCollection(){
    this._dashboardService.getRawCollection().subscribe(response => {
      this.rawCollectionHeader = response.table_headers
      this.rawCollectionData = response.raw_collection_obj
    })
  }

  setTestResult(){
    this.testResultModel.pool_id = this.selectedPool
    console.log(this.testResultModel);
    
    this._dashboardService.setTestResult(this.testResultModel).subscribe(response => {
      console.log(response)
      this.testResult.hide()
    })
  }


  // END API

  openNewPoolModal(){
    this.newPool.show()
  }

  openRawCollection(){
    this.rawCollectionModal.show()
  }

  makeRawSelection(id : number){
   if(this.collectionCheckBox.includes(id)){
      this.removeIndex = this.collectionCheckBox.indexOf(id, 0)

      this.collectionCheckBox.splice(this.removeIndex, 1)
    }else{
      this.collectionCheckBox.push(id)
    }
    this.collectionCheckBoxString = this.collectionCheckBox.toString()
    console.log(this.collectionCheckBoxString)
  }

  cancelRawSelection(){
    this.collectionCheckBox = []
    this.rawCollectionModal.hide()
  }

  doubleClicked(id : number){
    this.selectedPool = id
    this.testResult.show()
  }

}
