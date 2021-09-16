import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-module',
  templateUrl: './staff-module.component.html',
  styleUrls: ['./staff-module.component.css']
})
export class StaffModuleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openNav(){
    document.getElementById("mySidenav").style.width = "250px"
  }

  
  closeNav(){
    document.getElementById("mySidenav").style.width = "0px"
  }

}
