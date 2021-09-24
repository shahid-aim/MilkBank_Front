import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonorRegistrationService } from 'src/app/service/donor-registration/donor-registration.service';
import { InternalUrlMappings } from 'src/app/shared/UrlMapping';

@Component({
  selector: 'app-donor-profile',
  templateUrl: './donor-profile.component.html',
  styleUrls: ['./donor-profile.component.css']
})
export class DonorProfileComponent implements OnInit {

  token: string

  fullName: string = "";
  contact: number;
  email_id: string = "";
  dob: string;
  address: string = "";
  city: string = "";
  taluka: string = "";
  district: string = "";

  acute_disease: string
  fever_or_rashes: string
  hiv_hbag_disease: string
  blood_transfusion: string
  nicotine_alchol_consumption: string


  constructor(private _donorService: DonorRegistrationService, private _router : Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token")
    this.getDonorProfile()
    debugger
  }

  // API
  getDonorProfile() {
    this._donorService.getDonorProfile(this.token).subscribe(response => {
      this.fullName = response.full_name;
      this.contact = response.phone_number
      this.email_id = response.email
      this.dob = response.DOD
      this.address = response.address
      this.city = response.city
      this.taluka = response.taluka
      this.district = response.district

      this.acute_disease = (response.acute_disease == "false") ? "Yes" : "No"
      this.fever_or_rashes = (response.fever_or_rashes == "false") ? "Yes" : "No"
      this.hiv_hbag_disease = (response.hiv_hbag_disease == "false") ? "Yes" : "No"
      this.blood_transfusion = (response.blood_transfusion == "false") ? "Yes" : "No"
      this.nicotine_alchol_consumption = (response.nicotine_alchol_consumption == "false") ? "Yes" : "No"
    },
    error => {
      if (error.status == 401) {
        localStorage.removeItem("token")
        this._router.navigateByUrl(InternalUrlMappings.LOGIN)
      }
    })
  }

  logoutDonorProfile(){
    localStorage.removeItem("token")
    this._router.navigateByUrl("")
  }

}


