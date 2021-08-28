import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Login } from 'src/app/models/common';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [CommonService, CookieService]
})
export class LoginComponent implements OnInit {

  username : string
  password : string
  invalidUsernamePassword = false
  loginModel : Login = new Login()

  textFieldColor : "#f25b87"

  constructor(private _commonService : CommonService, private _cookieService : CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.loginModel.username= this.username
    this.loginModel.password= this.password
    this._commonService.login(this.loginModel).subscribe(response => {
      let expiry = new Date()
      expiry.setMinutes(expiry.getMinutes() + 60)
      this._cookieService.set("token", response.token, {expires : expiry, sameSite : 'Lax'})
      this.router.navigateByUrl("/donor-registration")
    },
    error => {
      this.invalidUsernamePassword = true
    }
    )
  }
}
