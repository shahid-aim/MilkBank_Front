import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InternalUrlMappings } from 'src/app/shared/UrlMapping';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ASSET_URL = environment.ASSET_URL 


  constructor(private _router : Router) { }


  ngOnInit(): void {
  }
  
  navigateToLogin(){
    this._router.navigateByUrl(InternalUrlMappings.LOGIN)
  }


}
