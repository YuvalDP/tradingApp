import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {CommonServiceService} from "../common-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-credential',
  templateUrl: './update-credential.component.html',
  styleUrls: ['./update-credential.component.css']
})
export class UpdateCredentialComponent implements OnInit {
  public errorMessage;
  updateList = {
    'email': '',
    'password': '',
    'newPassword': ''
  }
  constructor(private router: Router, private commonService: CommonServiceService, private toastr: ToastrService) { }

  ngOnInit() {
  }
  // Update credential Method
  public updateCredential() {
    this.commonService.UpdateCredentialData(this.updateList).subscribe((res) => {
      if (res) {
        this.toastr.success('Update Credential Successfully', 'Success Message');
        this.router.navigate(["login"]);
      }
    },(err) => {
      this.errorMessage = err.error.message
      if (err['status'] === 401) {
        this.updateList = {
          'email': '',
          'password': '',
          'newPassword': ''
        };
        this.toastr.error('UnAuthorized User', 'Update Failed');
      }
      console.log('error', err)
    });
  }
}
