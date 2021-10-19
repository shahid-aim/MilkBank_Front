import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PasturizationPaginator, PasturizationTest, TestResult } from '../../models/phase';
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
  token : string = "";
  pasturizationData:any;
  selectpasturization : number
  pasturizationPaginator : PasturizationPaginator = new PasturizationPaginator() 
  pasturizationResultModal: PasturizationTest = new PasturizationTest()
  testResultModel: TestResult = new TestResult()

  constructor(private _dashboardService : DashboardService) { }

  ngOnInit(): void {
    this._dashboardService.changeScreenTitle("Pre Pasturization")
    this.token = localStorage.getItem("token")
    this.pasturizationPaginator.page_start = 0
    this.pasturizationPaginator.page_end = 10
    this.pasturizationPaginator.screen = "pre"
    this.getPasturization()
  }


  getPasturization(){
    this._dashboardService.getPasturization(this.token, this.pasturizationPaginator).subscribe(response => {
      this.pasturizationData = response.pasturization_obj
      console.log("pre pasturization data -> ", response)
    },
    error => {
      if (error.status == 401) {
        this._dashboardService.logoutUser()
      }
    })
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
    this.pasturizationResultModal.id = this.selectpasturization
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
    this.testResultModel.id = this.selectpasturization
    this._dashboardService.setTestResult(this.token, this.testResultModel).subscribe(response => {
      this.getPasturization()
      this.testResult.hide()
      this.testResultModel = new TestResult()
    },
      error => {
        if (error.status == 401) {
          this._dashboardService.logoutUser()
        }
      })
  }
   
}
