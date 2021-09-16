import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExternalUrlMappings } from '../shared/UrlMapping';
import { CreatePool, CreateRawCollection, TestResult } from '../models/phase';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  token : any
  constructor(private _httpClient : HttpClient) {
    this.token = localStorage.getItem("token")
   }

  getLatestDonorAppointment() : Observable<any>{
    return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings.GET_LATEST_DONOR_APPOINTMENT, {headers : new HttpHeaders().set("Authorization", this.token)})
  }

  getRawCollection(): Observable<any>{
    return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings.GET_RAW_COLLECTION, {headers : new HttpHeaders().set("Authorization", this.token)})
  }

  createRawCollection(createRawCollection : CreateRawCollection) : Observable<any>{
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.CREATE_RAW_COLLECTION, createRawCollection, {headers : new HttpHeaders().set("Authorization", this.token)})
  }

  getDonorInfo(): Observable<any>{
    return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings.GET_DONOR_INFO, {headers : new HttpHeaders().set("Authorization", this.token)})
  }


  getPool() : Observable<any>{
    return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings.GET_POOL, {headers : new HttpHeaders().set("Authorization", this.token)})
  }

  createPool(createPool : CreatePool) : Observable<any>{
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.CREATE_POOL, createPool, {headers : new HttpHeaders().set("Authorization", this.token)})
  }


  setTestResult(testResult : TestResult) : Observable<any>{
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.SET_TEST_RESULT, testResult, {headers : new HttpHeaders().set("Authorization", this.token)})
  }

}
