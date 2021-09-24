import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactInformation, DonorRegistration, MedicalHistory } from 'src/app/models/donor-registraion';
import { environment } from 'src/environments/environment';
import { ExternalUrlMappings } from '../../shared/UrlMapping'

@Injectable({
  providedIn: 'root'
})
export class DonorRegistrationService {

  token : any
  constructor(private _httpClient : HttpClient) { 
    this.token = localStorage.getItem("token")
  }

  getDonorRegisteredInitial(): Observable<any>{
    return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings.GET_DONOR_REGISTERED_INITIAL, {headers : new HttpHeaders().set("Authorization", this.token)})
  }

  donorRegistration(donorRegistrationModel : DonorRegistration): Observable<any>{
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.DONOR_REGISTRATION, donorRegistrationModel, {headers : new HttpHeaders().set("Authorization", this.token)})
  }

  contactInformation(contactInformationModel : ContactInformation): Observable<any>{
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.CONTACT_INFORMATION, contactInformationModel, {headers : new HttpHeaders().set("Authorization", this.token)})
  }

  medicalHistory(medicalHistoryModel : MedicalHistory){
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.MEDICAL_HISTORY, medicalHistoryModel, {headers : new HttpHeaders().set("Authorization", this.token)})
  }

  getDonorProfile(token : string) : Observable<any>{
    return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings.GET_DONOR_PROFILE, {headers : new HttpHeaders().set("Authorization", token)})
  }

 
}
