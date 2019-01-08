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
public newData: any = [];
public newPrice = 0;
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
      console.log(res);
      this.liveData = res;
    }
      // this.newData = this.liveData.map((data) => {
      //   var URL = `wss://stream.binance.com:9443/ws/${data.symbol}@miniTicker`;
      //   var wsbi=new WebSocket(URL);
      //   wsbi.onmessage=function(e){
      //     console.log('e.data', e.data);
      //     var cost = data.price * data.quantity;
      //     var n = JSON.parse(e.data);
      //     this.newPrice = n.c;
      //
      //   }
      // });
    console.log('newData', this.newData);
  },(err) => {
    if (err['status'] === 401) {
      this.router.navigate(["login"]);
    }
    console.log('error', err)
  });
}

public updateLiveData() {

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
