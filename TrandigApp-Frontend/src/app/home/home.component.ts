import { Component, OnInit } from '@angular/core';
import {CommonServiceService} from "../common-service.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public liveData: any = [];
public updateStatus = {
  'status': 'close',
  'tradeID': ''
}
  constructor(private commonService: CommonServiceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.getLivePortFolio();
  }
public getLivePortFolio() {
  this.commonService.getPortFolioData().subscribe((res) => {
    if (res) {
      this.liveData = res;
    }
  },(err) => {
    if (err['status'] === 401) {
      this.router.navigate(["login"]);
    }
    console.log('error', err)
  });
}
public onClosePortFolio(row) {
  this.updateStatus.tradeID = row.tradeid;
  this.commonService.updatStatus(this.updateStatus).subscribe((res) => {
    if (res) {
      this.toastr.success('Close Successfully', 'Success Message');
      this.getLivePortFolio();
      console.log(res);
    }
  },(err) => {
    if (err['status'] === 401) {
      this.router.navigate(["login"]);
    }
    console.log('error', err)
  });
}
}
