import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pasturisation',
  templateUrl: './pasturisation.component.html',
  styleUrls: ['./pasturisation.component.css']
})
export class PasturisationComponent implements OnInit {
 
  @ViewChild(ModalDirective) success: ModalDirective;

  
  term:any='';
  
  constructor() { }

  ngOnInit(): void {
  }

  
 


showSu() {
  this.success.show()
  }
  
  hide() {
  this.success.hide()
  }

}
