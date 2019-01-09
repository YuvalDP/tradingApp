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
  // login Method
  public onLogin() {
    this.commonService.Authenticate(this.login).subscribe((res) => {
      if (res['loggedIn']) {
        localStorage.setItem('fullName', res['firstname'] + ' ' + res['lastname']);
        localStorage.setItem('userId', res['id']);
        localStorage.setItem('Token', res['token']);
        localStorage.setItem('userToken', res['loggedIn']);
        this.router.navigate(["home"]);
      }
    },(err) => {
      console.log('error', err)
      if (err['status'] === 401) {
        this.errorMessage = err.error.message
      } else {
        this.errorMessage = err.error.message
      }
    });
  }
}
