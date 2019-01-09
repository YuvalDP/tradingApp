import { Component, OnInit } from '@angular/core';
import {CommonServiceService} from "../common-service.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import * as _ from "lodash";
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public liveData: any = [];
public uniqueSymbol: any = [];
public newData: any = [];
public newPrice = 0;
public updateStatus = {
  'status': 'close',
  'tradeID': ''
}
  constructor(private commonService: CommonServiceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  setTimeout(() => {
    this.getLivePortFolio();
  }, 1000);
  }

public getLivePortFolio() {
  this.commonService.getPortFolioData().subscribe((res) => {
    if (res) {
      console.log(res);
      this.liveData = res;
      this.uniqueSymbol = _.uniqBy(this.liveData, 'symbol');
      this.uniqueSymbol = this.uniqueSymbol.map(dt => dt.symbol);
      this.fetchLiveDataBySymbol();
    }
    console.log('newData', this.newData);
  },(err) => {
    if (err['status'] === 401) {
      this.router.navigate(["login"]);
    }
    console.log('error', err)
  });
}

public fetchLiveDataBySymbol() {
  $("td[id^='ethusdt']").each(function (i, el) {
    console.log('val', el);
  });
  this.uniqueSymbol.map((symb) => {
    var URL = `wss://stream.binance.com:9443/ws/${symb}@miniTicker`;
    var wsbi=new WebSocket(URL);
    wsbi.onmessage=function(e){
      var n = JSON.parse(e.data);
      $(`td[id^=${symb}]`).each(function (i, el) {
        el.innerHTML = n.c;
      });
      $(`td[id^='pnl-${symb}']`).each(function (i, el) {
        console.log('n.c ',n.c);
        var cost = parseInt(el.id.split('-')[2]);
        var quantity = parseInt(el.id.split('-')[3]);
        el.innerHTML = (n.c - cost) * quantity;
      });


      // console.log('e.data', e.data);
      var n = JSON.parse(e.data);
      document.getElementById(symb).innerHTML = n.c;
    }
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
