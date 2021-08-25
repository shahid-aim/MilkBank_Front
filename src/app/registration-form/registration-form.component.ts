import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  textFieldColor : String = 'accent';
  
  hide : boolean = true;
  hide1:boolean = true;
  constructor() { }
 ngOnInit(): void {
  }
 
  myFunction() {
    this.hide = !this.hide;
    this.hide1 = !this.hide1;
  }
}
