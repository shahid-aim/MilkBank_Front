import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExternalUrlMappings } from '../shared/UrlMapping';
import { CreatePool, CreateRawCollection, TestResult } from '../models/phase';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _httpClient : HttpClient) { }

  getLatestDonorAppointment() : Observable<any>{
    return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings.GET_LATEST_DONOR_APPOINTMENT, {withCredentials : true})
  }

  getRawCollection(): Observable<any>{
    return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings.GET_RAW_COLLECTION, {withCredentials : true})
  }

  createRawCollection(createRawCollection : CreateRawCollection) : Observable<any>{
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.CREATE_RAW_COLLECTION, createRawCollection, {withCredentials : true})
  }

  getDonorInfo(): Observable<any>{
    return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings.GET_DONOR_INFO, {withCredentials : true})
  }


  getPool() : Observable<any>{
    return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings.GET_POOL, {withCredentials : true})
  }

  createPool(createPool : CreatePool) : Observable<any>{
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.CREATE_POOL, createPool, {withCredentials:true})
  }


  setTestResult(testResult : TestResult) : Observable<any>{
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.SET_TEST_RESULT, testResult, {withCredentials:true})
  }

}
