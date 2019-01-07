import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
@Injectable()
export class CommonServiceService {
  public httpOptions = {
    headers: new HttpHeaders({
      'Authorization':'Bearer ' + localStorage.getItem('Token')
    })
  };
  constructor(private http: HttpClient) { }
  // login API
  Authenticate(login) {
    return this.http
      .post(`${environment.baseURL}/auth/login`, login);
  }
  // SignUp API
  RegisterData(register) {
    return this.http
      .post(`${environment.baseURL}/user/signup`, register);
  }
  // Home Page API (get PortFolio)
  getPortFolioData() {
    return this.http
      .get(`${environment.baseURL}/trade/fetchPortfolio`, this.httpOptions);
  }
  // Update Credentail API
  UpdateCredentialData(data) {
    return this.http
      .put(`${environment.baseURL}/users/updateCredential`, data, this.httpOptions);
  }
  // Trade History Page API
  getTradeHistory(id) {
    return this.http
      .get(`${environment.baseURL}/trade/fetchTrades/` + id, this.httpOptions);
  }
  // Update Manage Trades API
  UpdateManageTrades(data) {
    return this.http
      .put(`${environment.baseURL}/trade/saveTrades`, data, this.httpOptions);
  }
}
