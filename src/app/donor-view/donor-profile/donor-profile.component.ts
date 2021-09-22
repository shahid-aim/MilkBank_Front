import { Component, OnInit } from '@angular/core';
import { DonorRegistrationService } from 'src/app/service/donor-registration/donor-registration.service';

@Component({
  selector: 'app-donor-profile',
  templateUrl: './donor-profile.component.html',
  styleUrls: ['./donor-profile.component.css']
})
export class DonorProfileComponent implements OnInit {

  token: string

  fullName: string = ""
  contact: number;
  email_id: string = "";
  dob: string;
  address: string = "";
  city: string = "";
  taluka: string = "";
  district: string = '';

  yes: boolean = true;
  no: boolean = false;
  constructor(private _donorService: DonorRegistrationService) { }

  ngOnInit(): void {

    this.token = localStorage.getItem("token")
    this.getDonorProfile()


    this.yes;
    this.no;
  }

  // API
  getDonorProfile() {
    this._donorService.getDonorProfile(this.token).subscribe(response => {
      console.log(response)
    response = response.donor
      
    this.fullName = response.full_name
    this.contact = response.phone_number
    this.email_id = response.email
    this.dob = response.DOD     // Change this to DOD in future
    this.address = response.address
    // this.city = response.
    // this.taluka = response.
    // this.district = response.
    }
    
    
    )
  }

}
