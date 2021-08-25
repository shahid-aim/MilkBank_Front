import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  
  textFieldColor : String = 'accent';
  hide : boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  myFunction() {
    this.hide = !this.hide;
  }

}


