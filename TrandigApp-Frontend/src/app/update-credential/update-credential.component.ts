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
    'userid': localStorage.getItem('userId'),
    'apiKey': '',
    'secretKey': ''
  }
  constructor(private router: Router, private commonService: CommonServiceService, private toastr: ToastrService) { }

  ngOnInit() {
  }
  // Update credential Method
  public updateCredential() {
    this.commonService.UpdateCredentialData(this.updateList).subscribe((res) => {
      if (res) {
        this.toastr.success('Credential Updated Successfully', 'Success Message');
        this.router.navigate(["home"]);
      }
    },(err) => {
      this.errorMessage = err.error.message
      if (err['status'] === 401) {
        this.updateList = {
          'userid': '',
          'apiKey': '',
          'secretKey': ''
        };
        this.toastr.error('UnAuthorized User', 'Update Failed');
      }
      console.log('error', err)
    });
  }
}
