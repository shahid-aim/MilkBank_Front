import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CreatePool, Paginator, PoolRawCollectionId } from '../../models/phase';
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
  @ViewChild("staffDetailModal") staffDetailModal: ModalDirective;
  @ViewChild("addTest") addTest: ModalDirective;
  @ViewChild("productdata") productdata: NgForm;
  @ViewChild("poolTest") poolTest: NgForm;


  constructor(private _dashboardService: DashboardService) { }

  collectionCheckBox: number[] = []
  collectionCheckBoxString: string
  collectionCheckBoxNameArray: string[] = []
  collectionCheckBoxNameString: string 
  searchTerm: string 
  removeIndex: number 

  rawCollectionData: any 
  poolData: any

  staffHeader: any
  staffData: any

  selectedPool: number
  selectedStaff: number


  searchString: string

  token: string = ""
  errorMsg: string = ""
  isErrorMsgVisible: boolean = false

  selectedDonorName: string
  selectedStaffName: string


  // extras
  element : HTMLInputElement
  inputValue : number

  selectedPoolCheckBox : boolean[]

  createPoolModel: CreatePool = new CreatePool()

  // for pasturization post result
  paginator: Paginator = new Paginator()
  ngOnInit(): void {

    this.paginator.page_start = 0
    this.paginator.page_end = 10

    this._dashboardService.changeScreenTitle("Pooling")
    this.token = localStorage.getItem("token")
    this.getPool()
    this.getRawCollection()
    this.getStaff()
  }

  // API 

  getPool() {
    this._dashboardService.getPool(this.token, this.paginator).subscribe(resp => {
      this.poolData = resp.pool_obj
      console.log("pagination ", resp)
    },
      error => {
        if (error.status == 401) {
          this._dashboardService.logoutUser()
        }
      })
  }

  createPool() {
    console.log(this.productdata)
    this.isErrorMsgVisible = false
    this.errorMsg = ""

    if (this.createPoolModel.total_volume < 1) {
      this.isErrorMsgVisible = true
      this.errorMsg = "Total volumne cannot be less than 1"
    }

    if (this.productdata.form.status == "INVALID") {
      this.isErrorMsgVisible = true
      this.errorMsg = "All fields are mandatory"
    }

    if (!this.isErrorMsgVisible) {
      // this.createPoolModel.raw_collection_id = this.collectionCheckBox
      this._dashboardService.createPool(this.token, this.createPoolModel).subscribe(response => {
        this.getPool()
        this.newPool.hide()
        this.createPoolModel = new CreatePool()
        this.selectedStaffName = ""
        this.collectionCheckBoxString = ""
        this.collectionCheckBoxNameString = ""
        this.collectionCheckBox.forEach((id: number) => {
          let el = <HTMLInputElement>document.getElementById(id + "");
          el.checked = false
        })

        this.collectionCheckBox = []
      },
        error => {
          if (error.status == 401) {
            this._dashboardService.logoutUser()
          }
        })
    }
  }

  getRawCollection() {
    this._dashboardService.getRawCollection(this.token, this.paginator).subscribe(response => {
      this.rawCollectionData = response.raw_collection_obj
      console.log(this.rawCollectionData);
      
    },
      error => {
        if (error.status == 401) {
          this._dashboardService.logoutUser()
        }
      })
  }

  getStaff() {
    this._dashboardService.getStaff(this.token).subscribe(response => {
      this.staffHeader = response.table_headers
      this.staffData = response.staff_obj
    },
      error => {
        if (error.status == 401) {
          this._dashboardService.logoutUser()
        }
      })
  }

  // END API

  openNewPoolModal() {
    this.newPool.show()
  }

  openRawCollection() {
    this.rawCollectionModal.show()
  }

  makeRawSelection(id: number, donorNameArray: string) {
    this.removeRawCollectionValidationError(id)

    if (this.collectionCheckBox.includes(id)) {
      this.removeIndex = this.collectionCheckBox.indexOf(id, 0)
      this.collectionCheckBox.splice(this.removeIndex, 1)

      this.removeIndex = this.collectionCheckBoxNameArray.indexOf(donorNameArray, 0)
      this.collectionCheckBoxNameArray.splice(this.removeIndex, 1)

    } else {
      this.collectionCheckBoxNameArray.push(donorNameArray)
      this.collectionCheckBox.push(id)
    }
    this.collectionCheckBoxNameString = this.collectionCheckBoxNameArray.toString()
    this.collectionCheckBoxString = this.collectionCheckBox.toString()
  }

  selectIdAndCloseStaffModal() {
    this.createPoolModel.staff_id = Number(this.selectedStaff)

    for (let s of this.staffData) {
      if (s.id == this.selectedStaff) {
        this.selectedStaffName = s.staff_full_name
        break
      }
    }
    this.staffDetailModal.hide()
  }

  showDonorStaffModal() {
    this.staffDetailModal.show()
  }

  cancelRawSelection() {
    this.collectionCheckBox = []
    this.rawCollectionModal.hide()
  }

  addTestResult(id: number) {
    this.selectedPool = id
    this.testResult.show()
  }

  showAddTest(id: number) {
    this.selectedPool = id
    this.addTest.show()
  }

  
  setRawCollectionVolume() {

    this.createPoolModel.total_volume = 0

    let isError = false

    this.createPoolModel.raw_collection_id = []

    for(let ele of this.collectionCheckBox){
      this.element = <HTMLInputElement>document.getElementById("txt-volume-used-" + ele)
      this.inputValue =  Number(this.element.value)
      
      if(this.inputValue > this.rawCollectionData[ele].volume_left || this.inputValue <= 0){
        // this.element.style.background = "red"
        this.element.style.border = "1px solid red"
        isError = true
        break;
      }
      else{
        this.createPoolModel.total_volume += this.inputValue
        this.createPoolModel.raw_collection_id.push(new PoolRawCollectionId(this.rawCollectionData[ele].id,this.inputValue))
      }
    }

    if(!isError){
      this.rawCollectionModal.hide()
    }

  }

  removeRawCollectionValidationError(id : number){
    document.getElementById("txt-volume-used-" + id).style.border= "none"
  }

}