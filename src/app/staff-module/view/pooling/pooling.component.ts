import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CreatePool, PoolTest, TestResult } from '../../models/phase';
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

  donor: any
  collectionCheckBox: number[] = []
  collectionCheckBoxString: string
  searchTerm: string
  removeIndex: number

  rawCollectionHeader: any
  rawCollectionData: any
  poolHeader: any
  poolData: any

  staffHeader: any
  staffData: any

  selectedPool: number
  selectedStaff: number

  testingLabs: any

  searchString: string

  token: string = ""
  errorMsg: string = ""
  isErrorMsgVisible: boolean = false

  selectedDonorName: string
  selectedStaffName: string


  createPoolModel: CreatePool = new CreatePool()
  testResultModel: TestResult = new TestResult()
  // for pasturization post result
  poolResultModal: PoolTest = new PoolTest()


  ngOnInit(): void {
    this.token = localStorage.getItem("token")
    this.getPool()
    this.getRawCollection()
    this.getStaff()
    this.getTestingLabName()
  }

  // API 

  getPool() {
    this._dashboardService.getPool(this.token).subscribe(resp => {
      this.poolHeader = resp.table_header
      this.poolData = resp.pool_obj
      console.log(this.poolData);
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


    if (this.createPoolModel.total_units < 1) {
      this.isErrorMsgVisible = true
      this.errorMsg = "Total unit cannot be less than 1"
    }

    if (this.createPoolModel.test_sample_qty < 1) {
      this.isErrorMsgVisible = true
      this.errorMsg = "Test sample quantity cannot be less than 1"
    }

    if (this.createPoolModel.total_volume < 1) {
      this.isErrorMsgVisible = true
      this.errorMsg = "Total volumne cannot be less than 1"
    }

    if (this.productdata.form.status == "INVALID") {
      this.isErrorMsgVisible = true
      this.errorMsg = "All fields are mandatory"
    }

    if (!this.isErrorMsgVisible) {
      this.createPoolModel.raw_collection_id = this.collectionCheckBox
      this._dashboardService.createPool(this.token, this.createPoolModel).subscribe(response => {
        this.getPool()
        this.newPool.hide()
        this.createPoolModel = new CreatePool()
        this.selectedStaffName = ""
        this.collectionCheckBoxString = ""

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

  getTestingLabName() {
    this._dashboardService.getTestingLabsName(this.token).subscribe(resp => {
      this.testingLabs = resp
    },
      error => {
        if (error.status == 401) {
          this._dashboardService.logoutUser()
        }
      })
  }

  getRawCollection() {
    this._dashboardService.getRawCollection(this.token).subscribe(response => {
      this.rawCollectionHeader = response.table_headers
      this.rawCollectionData = response.raw_collection_obj
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

  setTestResult() {    
    this.testResultModel.pool_id = this.selectedPool
    this._dashboardService.setTestResult(this.token, this.testResultModel).subscribe(response => {
      this.getPool()
      this.testResult.hide()
      this.testResultModel = new TestResult()
    },
      error => {
        if (error.status == 401) {
          this._dashboardService.logoutUser()
        }
      })
  }

  addPoolTest() {

    console.log(this.poolTest);

    this.poolResultModal.pool_id = this.selectedPool
    this._dashboardService.addPoolTest(this.token, this.poolResultModal).subscribe(response => {
      this.getPool()
      this.addTest.hide()
      this.poolResultModal = new PoolTest()
      console.log("Test Updated");
      
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

  makeRawSelection(id: number) {
    if (this.collectionCheckBox.includes(id)) {
      this.removeIndex = this.collectionCheckBox.indexOf(id, 0)
      this.collectionCheckBox.splice(this.removeIndex, 1)
    } else {
      this.collectionCheckBox.push(id)
    }
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

}