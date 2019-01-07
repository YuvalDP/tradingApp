import { Component, OnInit } from '@angular/core';
import {CommonServiceService} from "../common-service.service";
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public errorMessage;
registerList = {
  'username': '',
  'firstname': '',
  'lastname': '',
  'email': '',
  'password': ''
}
public listOfRecords: any = [];
  constructor(private router: Router, private commonService: CommonServiceService, private toastr: ToastrService) { }

  ngOnInit() {
  }
  // signUp Method
  public onRegistration() {
    this.registerList.username = this.registerList.firstname;
    this.commonService.RegisterData(this.registerList).subscribe((res) => {
      if (res) {
        this.toastr.success('Signup Data Saved Successfully', 'Success Message');
        this.router.navigate(["login"]);
      }
    },(err) => {
      this.errorMessage = err.error.message
      console.log('error', err)
    });
  }
}
