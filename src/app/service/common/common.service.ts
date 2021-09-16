import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserModel, Login } from 'src/app/models/common';
import { environment } from 'src/environments/environment';
import { ExternalUrlMappings } from '../../shared/UrlMapping'

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _httpClient : HttpClient) { }

  public createUser(createUserModel : CreateUserModel) : Observable<any>{
    return this._httpClient.post(environment.BASE_URL + ExternalUrlMappings.CREATE_USER, createUserModel)
  }

  public login(loginModel : Login) : Observable<any>{
    return this._httpClient.post(environment.BASE_URL +  ExternalUrlMappings.LOGIN, loginModel)
  }

  
}
