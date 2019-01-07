import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
@Injectable()
export class CommonServiceService {
public tokenKey = '';
  public httpOptions = {
    headers: new HttpHeaders({
      'Authorization':'Bearer ' + this.tokenKey
    })
  };
  constructor(private http: HttpClient) { }

  Authenticate(login) {
    return this.http
      .post(`${environment.baseURL}/auth/login`, login);
  }

  RegisterData(register) {
    return this.http
      .post(`${environment.baseURL}/user/signup`, register);
  }
  getPortFolioData() {
    return this.http
      .get(`${environment.baseURL}/trade/fetchPortfolio`, this.httpOptions);
  }
  UpdateCredentialData(data) {
    return this.http
      .post(`${environment.baseURL}/users/updateCredential`, data);
  }
  getTradeHistory() {
    return this.http
      .get(`${environment.baseURL}/trade/fetchTrades/1`, this.httpOptions);
  }

}
