import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExternalUrlMappings } from '../shared/UrlMapping';
import { CreatePasturization, CreatePool, CreateRawCollection, CreateBottling, Paginator} from '../models/phase';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private screenTitle = new BehaviorSubject('default message');
  currentScreenTitle = this.screenTitle.asObservable();
  
  constructor(private _httpClient: HttpClient, private _router: Router) {}

  changeScreenTitle(screenTitle : string){
    this.screenTitle.next(screenTitle)
  }


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

  getRawCollection(token: string, paginator : Paginator): Observable<any> {
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.GET_RAW_COLLECTION , paginator, { headers: new HttpHeaders().set("Authorization", token) })
  }

  createRawCollection(token: string, createRawCollection: CreateRawCollection): Observable<any> {
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.CREATE_RAW_COLLECTION, createRawCollection, { headers: new HttpHeaders().set("Authorization", token) })
  }

  getDonorInfo(token: string): Observable<any> {
    return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings.GET_DONOR_INFO, { headers: new HttpHeaders().set("Authorization", token) })
  }


  getPool(token : string ,pagination : Paginator): Observable<any> {
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.GET_POOL, pagination ,{ headers: new HttpHeaders().set("Authorization", token) })
  }

  createPool(token : string, createPool: CreatePool): Observable<any> {
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.CREATE_POOL, createPool, { headers: new HttpHeaders().set("Authorization", token) })
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

  updatePasturizationPostResult(token : string) : Observable<any>{
    return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings.UPDATE_PASTURIZATION_POST_RESULT,{headers: new HttpHeaders().set("Authorization", token) })
  }

  getBottle(token : string) :  Observable<any>{
    return this._httpClient.get(environment.BASE_URL + ExternalUrlMappings.GET_BOTTLE, { headers: new HttpHeaders().set("Authorization", token) })
  }

  createBottle(token:string , createBottling : CreateBottling){
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.CREATE_BOTTLE, createBottling, { headers: new HttpHeaders().set("Authorization", token) })
  }

  getPasturizationPool(token : string, pasturzationId : number){
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.GET_PASTURIZATION_POOL, {"pasturization_id" : pasturzationId}, { headers: new HttpHeaders().set("Authorization", token) })
  }

}
