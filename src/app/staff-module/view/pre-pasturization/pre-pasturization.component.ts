import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PasturizationPaginator, PasturizationTest, TestResult, CreatePasturization, Paginator } from '../../models/phase';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-pre-pasturization',
  templateUrl: './pre-pasturization.component.html',
  styleUrls: ['./pre-pasturization.component.css']
})
export class PrePasturizationComponent implements OnInit {
  @ViewChild("testResult") testResult: ModalDirective;
  @ViewChild("addTest") addTest: ModalDirective;
  @ViewChild("productdata") productdata: NgForm;
  @ViewChild("poolTest") poolTest: NgForm;


  @ViewChild("pasturizationForm") pasturizationForm: ModalDirective;
  @ViewChild("donorDetailModal") donorDetailModal: ModalDirective;
  @ViewChild("poolModal") poolModal: ModalDirective


  token : string = "";
  pasturizationData:any;
  selectpasturization : number

  term: any = '';
  pasturizationHeader: any;
  searchString: string;
  searchTerm: string;

  removeIdIndex: number
  poolArray: number[] = []

  poolData: any;
  poolHeader: any;
  testingLabs: any


  createPasturizationModal: CreatePasturization = new CreatePasturization()
  pasturizationPaginator : PasturizationPaginator = new PasturizationPaginator() 
  pasturizationResultModal: PasturizationTest = new PasturizationTest()
  testResultModel: TestResult = new TestResult()


  constructor(private _dashboardService: DashboardService) { }

  ngOnInit(): void {

   
    this._dashboardService.changeScreenTitle("Pre Pasturization")
    this.token = localStorage.getItem("token")
    this.pasturizationPaginator.page_start = 0
    this.pasturizationPaginator.page_end = 10
    this.pasturizationPaginator.screen = "pre"
    this.getPasturization()
    this.getTestingLabName()
    this.getPool()
   
  }

  getPool() {
    this._dashboardService.getPool(this.token,this.pasturizationPaginator).subscribe(resp => {
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


  getPasturization() {
    this._dashboardService.getPasturization(this.token, this.pasturizationPaginator).subscribe(response => {
      this.pasturizationData = response.pasturization_obj
    
    },
      error => {
        if (error.status == 401) {
          this._dashboardService.logoutUser()
        }
      })
  }

  getTestingLabName() {
    this._dashboardService.getTestingLabsName(this.token).subscribe(resp => {
      this.testingLabs = resp
      console.log(resp)
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
    this.removeIdIndex = this.poolArray.indexOf(id)
    if (this.removeIdIndex == -1) {
      this.poolArray.push(id)
    }
    else {
      this.poolArray.splice(this.removeIdIndex, 1)
    }
  }

  addTestResult(id: number) {
    this.selectpasturization = id
    this.testResult.show()
  }

  showAddTest(id: number) {
    this.selectpasturization = id
    this.addTest.show()
  }


  addPoolTest() {
    this.pasturizationResultModal.pasturization_id= this.selectpasturization
    this._dashboardService.addPoolTest(this.token, this.pasturizationResultModal).subscribe(response => {
      this.getPasturization()
      this.addTest.hide()
      this.pasturizationResultModal = new PasturizationTest()
      console.log("Test Updated");
      
    },
      error => {
        if (error.status == 401) {
          this._dashboardService.logoutUser()
        }
      })
  }

  setTestResult() {    
    this.testResultModel.pasturization_id = this.selectpasturization
    this._dashboardService.setTestResult(this.token, this.testResultModel).subscribe(response => {
      this.getPasturization()
      this.testResult.hide()
      this.testResultModel = new TestResult()
      console.log(response)
    },
      error => {
        if (error.status == 401) {
          this._dashboardService.logoutUser()
        }
      })
  }

  

   
}
