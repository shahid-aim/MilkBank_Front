import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactInformation, DonorRegistration, MedicalHistory } from 'src/app/models/donor-registraion';
import { DonorRegistrationService } from 'src/app/service/donor-registration/donor-registration.service';
@Component({
  selector: 'app-donor-registration',
  templateUrl: './donor-registration.component.html',
  styleUrls: ['./donor-registration.component.css'],
  providers : [FormBuilder, DonorRegistrationService]
})
export class DonorRegistrationComponent implements OnInit {

  fullName : string = ""
  contactNumber : number = 0 

  isEditable = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup
  fourthFormGroup: FormGroup

  formControls: any

  donorRegistrationModel: DonorRegistration = new DonorRegistration()
  contactInformationModel: ContactInformation =  new ContactInformation()
  medicalHistoryModel : MedicalHistory = new MedicalHistory()
  constructor(private _formBuilder: FormBuilder, private _donorRegistration : DonorRegistrationService, private _router : Router) {
    
    this._donorRegistration.getDonorRegisteredInitial().subscribe(response => {
      this.fullName = response.full_name
      this.contactNumber = response.phone_number
      this.firstFormGroup.controls.fullName.setValue(this.fullName)
      this.firstFormGroup.controls.contactNumber.setValue(this.contactNumber)
      this.secondFormGroup.controls.contactNumber.setValue(this.contactNumber)
    })
    
    this.firstFormGroup = this._formBuilder.group({
      fullName: [{ value: '', disabled: true }, Validators.required],
      DOB: ['', Validators.required],
      TOD: ['', Validators.required],
      DOD: ['', Validators.required],
      contactNumber: [{ value: '', disabled: true }, Validators.required],
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      contactNumber: ['', Validators.required],
      address: ['', Validators.required],
      city : ['', Validators.required],
      talkua: ['', Validators.required],
      district: ['', Validators.required],
      pincode: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      nicotineAlcohol: ['', Validators.required],
      bloodTransfusion: ['', Validators.required],
      feverRashes: ['', Validators.required],
      acuteDisease: ['', Validators.required],
      hivHbagDisease: ['', Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
  }
  

  ngOnInit(): void {
    
  }

  submitDonorRegistration() {
    this.formControls = this.firstFormGroup.controls
    this.donorRegistrationModel.DOB = this.formControls.DOB.value
    this.donorRegistrationModel.delivery_type = this.formControls.TOD.value
    this.donorRegistrationModel.DOD = this.formControls.DOD.value
    this.donorRegistrationModel.document_type = this.formControls.documentType.value
    this.donorRegistrationModel.document_number = this.formControls.documentNumber.value

    console.log(this.donorRegistrationModel)

    this._donorRegistration.donorRegistration(this.donorRegistrationModel).subscribe(response => {
      console.log("Response -> \n", response)
    })

  }

  saveContactInformation(){
    this.formControls = this.secondFormGroup.controls
    this.contactInformationModel.address = this.formControls.address.value
    this.contactInformationModel.city = this.formControls.city.value
    this.contactInformationModel.taluka = this.formControls.talkua.value
    this.contactInformationModel.district = this.formControls.district.value
    this.contactInformationModel.pincode = this.formControls.pincode.value

    this._donorRegistration.contactInformation(this.contactInformationModel).subscribe(response => {
      console.log(response)
    })
    console.log(this.contactInformationModel)
  }


  medicalHistory(){
    this.formControls = this.thirdFormGroup.controls
    this.medicalHistoryModel.nicotine_alchol_consumption = this.formControls.nicotineAlcohol.value == "yes" ? true : false
    this.medicalHistoryModel.blood_transfusion = this.formControls.bloodTransfusion.value == "yes" ? true : false
    this.medicalHistoryModel.fever_or_rashes = this.formControls.feverRashes.value == "yes" ? true : false
    this.medicalHistoryModel.acute_disease = this.formControls.acuteDisease.value == "yes" ? true : false
    this.medicalHistoryModel.hiv_hbag_disease = this.formControls.hivHbagDisease.value == "yes" ? true : false
    console.log("this.medicalHistoryModel -> ", this.medicalHistoryModel)
    
    this._donorRegistration.medicalHistory(this.medicalHistoryModel).subscribe(response => {
      console.log(response)
    })
  }


  navigateToRegistrationComplete(){
    this._router.navigateByUrl("registration-complete")
  }
}