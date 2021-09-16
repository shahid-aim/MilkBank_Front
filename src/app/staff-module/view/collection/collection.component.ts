import { Component, OnInit, ViewChild } from '@angular/core';
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
  term:any;
  date : Date
  time : any


  rawCollectionHeader : any
  rawCollectionData : any
  searchString : any

  donorHeader : any
  donorData : any
  selectedDonor : string


  createRawCollectionModal : CreateRawCollection = new CreateRawCollection()
  constructor(private _dashboardService : DashboardService) { }

  ngOnInit(): void {
    this.getRawCollection()
    this.getDonorInfo()
    
  }

  // Api Call

  getRawCollection(){
    this._dashboardService.getRawCollection().subscribe(response => {
      this.rawCollectionHeader = response.table_headers
      this.rawCollectionData = response.raw_collection_obj
    })
  }

  getDonorInfo(){
    this._dashboardService.getDonorInfo().subscribe(response => {
      console.log("Donor info", response)
      this.donorHeader = response.table_header
      this.donorData = response.donor
    })
  }

  // End 

  openCollectionForm(){
    this.collectionForm.show()
  }

  showDonorDetailModal(){
    console.log("Firided");
    this.donorDetailModal.show()
  }

  selectIdAndClose(){
    this.createRawCollectionModal.donor = Number(this.selectedDonor)
    this.donorDetailModal.hide()
  }

  createRawCollection(){
    this.createRawCollectionModal.createdDateTime = new Date(this.date + "T"  + this.time)

    console.log(this.createRawCollectionModal)
    this._dashboardService.createRawCollection(this.createRawCollectionModal).subscribe(response => {
      this.collectionForm.hide()
    }, 
    error => {
      console.log()
    }
    )
  }


}
