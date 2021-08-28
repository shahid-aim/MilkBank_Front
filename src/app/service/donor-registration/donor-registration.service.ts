import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactInformation, DonorRegistration, MedicalHistory } from 'src/app/models/donor-registraion';
import { environment } from 'src/environments/environment';
import { ExternalUrlMappings } from '../../shared/UrlMapping'

@Injectable({
  providedIn: 'root'
})
export class DonorRegistrationService {

  constructor(private _httpClient : HttpClient) { }

  donorRegistration(donorRegistrationModel : DonorRegistration): Observable<any>{
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.DONOR_REGISTRATION, donorRegistrationModel, {withCredentials : true})
  }

  contactInformation(contactInformationModel : ContactInformation): Observable<any>{
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.CONTACT_INFORMATION, contactInformationModel, {withCredentials : true})
  }

  medicalHistory(medicalHistoryModel : MedicalHistory){
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.MEDICAL_HISTORY, medicalHistoryModel, {withCredentials : true})
  }
 
}
