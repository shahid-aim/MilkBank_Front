import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExternalUrlMappings } from '../shared/UrlMapping';
import { CreatePasturization, CreatePool, CreateRawCollection, PoolTest, TestResult} from '../models/phase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  [x: string]: any;
  
  constructor(private _httpClient: HttpClient, private _router: Router) {}

  logoutUser() {
    localStorage.removeItem("token")
    this._router.navigateByUrl("/login")
  }

  getStaff(token: string): Observable<any> {
    return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings.GET_STAFF, { headers: new HttpHeaders().set("Authorization", token) })
  }

  getLatestDonorAppointment(token : string): Observable<any> {
    return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings.GET_LATEST_DONOR_APPOINTMENT, { headers: new HttpHeaders().set("Authorization", token) })
  }

  getRawCollection(token: string): Observable<any> {
    return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings.GET_RAW_COLLECTION, { headers: new HttpHeaders().set("Authorization", token) })
  }

  createRawCollection(token: string, createRawCollection: CreateRawCollection): Observable<any> {
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.CREATE_RAW_COLLECTION, createRawCollection, { headers: new HttpHeaders().set("Authorization", token) })
  }

  getDonorInfo(token: string): Observable<any> {
    return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings.GET_DONOR_INFO, { headers: new HttpHeaders().set("Authorization", token) })
  }


  // for bottling
  // getBottlePool(token : string){
  //   return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings),{ headers : new HttpHeaders().set("Authorization",token)} )
  // }


  getPool(token : string): Observable<any> {
    return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings.GET_POOL, { headers: new HttpHeaders().set("Authorization", token) })
  }

  createPool(token : string, createPool: CreatePool): Observable<any> {
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.CREATE_POOL, createPool, { headers: new HttpHeaders().set("Authorization", token) })
  }

  setTestResult(token : string, testResult: TestResult): Observable<any> {
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.SET_TEST_RESULT, testResult, { headers: new HttpHeaders().set("Authorization", token) })
  }

  createPasturization(token: string, createPasturization: CreatePasturization): Observable<any> {
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.CREATE_PASTURIZATION, createPasturization, { headers: new HttpHeaders().set("Authorization", token) })
  }

  getPasturization(token: string): Observable<any> {
    return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings.GET_PASTURIZATION, { headers: new HttpHeaders().set("Authorization", token) })
  }

  getTestingLabsName(token : string) : Observable<any>{
     return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings.GET_TESTING_LABS_NAME, { headers: new HttpHeaders().set("Authorization", token) })
  }

  // // for bottling

  // CreateBottling(tokan : string , createbottling : createBottling):Observable<any> {
  //   return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings) 
  // }

  getBottling():Observable<any> {
    return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings)
  }

  updatePasturizationPostResult(token : string) : Observable<any>{
    return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings.UPDATE_PASTURIZATION_POST_RESULT,{headers: new HttpHeaders().set("Authorization", token) })
  }

  addPoolTest(token : string, addTest: PoolTest): Observable<any> {
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.UPDATE_POOL_TEST, addTest, { headers: new HttpHeaders().set("Authorization", token) })
  }

}
