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
  public updateCredential() {
    this.commonService.UpdateCredentialData(this.updateList).subscribe((res) => {
      if (res) {
        this.toastr.success('Update Credential Successfully', 'Success Message');
      }
    },(err) => {
      this.errorMessage = err.error.message
      console.log('error', err)
    });
  }
}
