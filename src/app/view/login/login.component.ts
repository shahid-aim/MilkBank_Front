import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Login } from 'src/app/models/common';
import { CommonService } from 'src/app/service/common/common.service';
import { InternalUrlMappings } from 'src/app/shared/UrlMapping';
import { InternalUrlMappings as StaffInternalUrlMappings } from 'src/app/staff-module/shared/UrlMapping';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CommonService, CookieService]
})
export class LoginComponent implements OnInit {
  hide: boolean = true
  username: string
  password: string
  invalidUsernamePassword = false
  loginModel: Login = new Login()

  textFieldColor: "accent"

  constructor(private _commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {

    this.invalidUsernamePassword = false

    if (this.username != null && this.password != null) {
      this.loginModel.username = this.username
      this.loginModel.password = this.password

      this._commonService.login(this.loginModel).subscribe(response => {
      
        localStorage.setItem("token", response.token)
        let expiry = new Date()
        expiry.setMinutes(expiry.getMinutes() + 60)
        if (response.user_group == "Donor") {
          if(response.donor_profile_complete == true)
          {
            debugger
            this.router.navigateByUrl(InternalUrlMappings.DONOR_PROFILE)
          }
          else
            this.router.navigateByUrl(InternalUrlMappings.DONOR_REGISTRATION)
        }
        else {
          this.router.navigateByUrl(InternalUrlMappings.STAFF + "/" + StaffInternalUrlMappings.DASHBOARD)
        }
      },
        error => {
          this.invalidUsernamePassword = true
        }
      )
    }
  }

  navigateToHome() {
    this.router.navigateByUrl("")
  }

  navigateToRegistration() {
    this.router.navigateByUrl(InternalUrlMappings.REGISTRATION)
  }

}

// this._cookieService.set("token", response.token, {expires : expiry, sameSite : 'Lax', secure : false})