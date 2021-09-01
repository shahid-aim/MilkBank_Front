import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InternalUrlMappings } from 'src/app/shared/UrlMapping';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _router : Router) { }

  ngOnInit(): void {
  }
  
  navigateToLogin(){
    this._router.navigateByUrl(InternalUrlMappings.LOGIN)
  }


}
