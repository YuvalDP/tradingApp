import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
@Injectable()
export class CommonServiceService {
  // public wsbi: any;
  // wsbi = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@miniTicker");
  public httpOptions;
  constructor(private http: HttpClient) { }

  public getAuthToken() {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization':'Bearer ' + localStorage.getItem('Token')
        })
      };
      return this.httpOptions;
    }

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
      .get(`${environment.baseURL}/trade/fetchPortfolio`, this.getAuthToken());
  }
  // Update Credentail API
  UpdateCredentialData(data) {
    return this.http
      .put(`${environment.baseURL}/users/updateCredential`, data, this.getAuthToken());
  }
  // update Status
  updatStatus(data) {
    return this.http
      .put(`${environment.baseURL}/trade/updateTrade`, data, this.getAuthToken());
  }
  // Trade History Page API
  getTradeHistory(id) {
    return this.http
      .get(`${environment.baseURL}/trade/fetchTrades/` + id, this.getAuthToken());
  }
  // Update Manage Trades API
  UpdateManageTrades(data) {
    return this.http
      .put(`${environment.baseURL}/trade/saveTrades`, data, this.getAuthToken());
  }
  // getting symbols API
  getSymbolList() {
    return this.http
      .get(`${environment.baseURL}/trade/fetchSymbols`, this.getAuthToken());
  }
}
