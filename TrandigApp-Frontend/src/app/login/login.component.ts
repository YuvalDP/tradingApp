import { Component, OnInit } from '@angular/core';
import {CommonServiceService} from "../common-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public errorMessage;
  login = {
    email: '',
    password: ''
  }
  constructor(private router: Router, private commonService: CommonServiceService) { }

  ngOnInit() {
  }
  public onLogin() {
    this.commonService.Authenticate(this.login).subscribe((res) => {
      if (res['loggedIn']) {
        this.commonService.tokenKey = res['token'];
        localStorage.setItem('userToken', res['loggedIn']);
        this.router.navigate(["home"]);
      }
    },(err) => {
      console.log('error', err)
      this.errorMessage = err.error.message
    });
  }
}
