import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CreateRawCollection } from '../../models/phase';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  @ViewChild("collectionForm") collectionForm: ModalDirective;
  @ViewChild("donorDetailModal") donorDetailModal: ModalDirective;
  @ViewChild("staffDetailModal") staffDetailModal: ModalDirective;
  @ViewChild("nativeCollectionForm") nativeCollectionForm: NgForm;


  token: string = ""

  term: any;
  date: Date
  time: any


  rawCollectionHeader: any
  rawCollectionData: any

  staffHeader: any
  staffData: any

  searchString: any

  donorHeader: any
  donorData: any
  selectedDonor: string
  selectedStaff: string

  selectedDonorName: string
  selectedStaffName: string

  errorMsg: string = ""
  isErrorMsgVisible: boolean = false

  createRawCollectionModal: CreateRawCollection = new CreateRawCollection()
  constructor(private _dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token")
    this.getRawCollection()
    this.getDonorInfo()
    this.getStaff()

  }

  // Api Call

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

  getDonorInfo() {
    this._dashboardService.getDonorInfo(this.token).subscribe(response => {
      this.donorHeader = response.table_header
      this.donorData = response.donor
    },
      error => {
        if (error.status == 401) {
          this._dashboardService.logoutUser()
        }
      })
  }

  // End
  openCollectionForm() {
    this.collectionForm.show()
  }

  showDonorDetailModal() {
    this.donorDetailModal.show()
  }

  showDonorStaffModal() {
    this.staffDetailModal.show()
  }

  selectIdAndClose() {
    this.createRawCollectionModal.donor = Number(this.selectedDonor)
    for (let d of this.donorData) {
      if (d.id == this.selectedDonor) {
        this.selectedDonorName = d.full_name
        break
      }
    }

    this.donorDetailModal.hide()
  }

  selectIdAndCloseStaffModal() {
    this.createRawCollectionModal.staff = Number(this.selectedStaff)

    for (let s of this.staffData) {
      if (s.id == this.selectedStaff) {
        this.selectedStaffName = s.staff_full_name
        break
      }
    }
    this.staffDetailModal.hide()
  }

  createRawCollection() {

    console.log()

    this.isErrorMsgVisible = false
    this.errorMsg = ""

    if(this.nativeCollectionForm.status == "INVALID"){
      this.isErrorMsgVisible = true
      this.errorMsg = "All fields are compulsory"
    }

    

    if (this.createRawCollectionModal.volumeCollected < 1) {
      this.isErrorMsgVisible = true
      this.errorMsg = "Total volume cannot be less than 1"
    }


    if (this.createRawCollectionModal.units < 1) {
      this.isErrorMsgVisible = true
      this.errorMsg = "Number of units cannot be less than 1"
    }


    if (!this.isErrorMsgVisible) {
      this.createRawCollectionModal.createdDateTime = new Date(this.date + "T" + this.time)
      this._dashboardService.createRawCollection(this.token, this.createRawCollectionModal).subscribe(response => {
        this.collectionForm.hide()
        this.getRawCollection()
        this.createRawCollectionModal = new CreateRawCollection()
      },
        error => {
          if (error.status == 401) {
            this._dashboardService.logoutUser()
          }
        }
      )
    }

  }
}
