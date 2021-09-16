import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { CreatePasturization } from '../../models/phase';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-pasturisation',
  templateUrl: './pasturisation.component.html',
  styleUrls: ['./pasturisation.component.css']
})
export class PasturisationComponent implements OnInit {
 
  @ViewChild("pasturizationForm") pasturizationForm: ModalDirective;
  @ViewChild("donorDetailModal") donorDetailModal: ModalDirective;

  term:any='';
  pasturizationHeader:any;
  pasturizationData:any;
  searchString:string;
  
  createPasturizationModal : CreatePasturization = new CreatePasturization()
 
  constructor(private _dashboardService : DashboardService) { }

  
  ngOnInit(): void {
    this.getPasturization()
  }

  // Api Call

  getPasturization(){
    this._dashboardService.getPasturization().subscribe(response => {
      console.log("PAST", response)
      this.pasturizationHeader = response.table_headers
      this.pasturizationData = response.pasturization_obj
    })
  }

  createPasturization(){
    console.log(this.createPasturizationModal)
  
    this._dashboardService.createPasturization(this.createPasturizationModal).subscribe(response => {
      console.log("Pasturi", response)
      this.pasturizationForm.show()
    })
  }

  
  openCollectionForm(){
    this.pasturizationForm.show()
  }

  showDonorDetailModal(){
    console.log("Firided");
    this.donorDetailModal.show()
  }


 

}
