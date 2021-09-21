import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donor-profile',
  templateUrl: './donor-profile.component.html',
  styleUrls: ['./donor-profile.component.css']
})
export class DonorProfileComponent implements OnInit {

  fullName : string = ""
  contact : number;
  email_id:string= "";
  dob:string;
  address:string= "";
  city:string= "";
  taluka:string= "";
  district:string= '';
  constructor() { }

  ngOnInit(): void {
    this.fullName = "Hello World"
    this.contact = 7789787890;
    this.email_id = "abc@gmail.com";
    this.dob = "25/3/1998" ;
    this.address= "Pune";
    this.city= "Pune";
    this.taluka= "Haveli";
    this.district= "Pune"
  }

}
