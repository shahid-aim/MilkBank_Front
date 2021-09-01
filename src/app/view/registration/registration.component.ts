import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CreateUserModel } from 'src/app/models/common';
import { CommonService } from 'src/app/service/common/common.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers : [FormBuilder],
})
export class RegistrationComponent implements OnInit {

  @ViewChild(ModalDirective) success: ModalDirective;


  formControls : any
  hide : boolean = true
  hide1 :boolean =true
  textFieldColor = "#f25b87"
  message : string = ""
  invalidUsernamePassword : boolean = false
  registrationFormGroup : FormGroup

  createUserModel : CreateUserModel = new CreateUserModel()


  constructor(private _formBuilder: FormBuilder, private _commonService : CommonService) {

    this.registrationFormGroup = this._formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/), Validators.minLength(2)]],
      phoneNumber: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
   }

  ngOnInit(): void {}

  showSu(){
    this.success.show()
  }

  createUser(){
    console.log(this.registrationFormGroup.status)
    this.formControls = this.registrationFormGroup.controls
    if(this.formControls.password.value == this.formControls.confirmPassword.value && this.registrationFormGroup.status == "VALID"){
      
      if(this.formControls.password.value == this.formControls.confirmPassword.value){
        this.createUserModel.full_name = this.formControls.fullName.value
        this.createUserModel.email = this.formControls.email.value
        this.createUserModel.phone_number = this.formControls.phoneNumber.value
        this.createUserModel.username = this.formControls.username.value
        this.createUserModel.password = this.formControls.password.value
        console.log(this.createUserModel)
  
        this._commonService.createUser(this.createUserModel).subscribe(response => {
          console.log(response)
          if(response == "User Created"){
            this.success.show()
          }
        },
        error =>{
          this.message = error.error
          this.invalidUsernamePassword = true
        })
      }else{
        this.message = "Password and Confirm Password"
        this.invalidUsernamePassword = true
      }
      
     
    }

  }

}