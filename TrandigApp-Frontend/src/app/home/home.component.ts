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
  'contractid': ''
}
  constructor(private commonService: CommonServiceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.getLivePortFolio();
  }

public getLivePortFolio() {
  const id = localStorage.getItem('userId');
  this.commonService.getPortFolioData(id).subscribe((res) => {
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
        // console.log('n.c ',n.c);
        var boughtAt = parseInt(el.id.split('-')[2]);
        var quantity = parseInt(el.id.split('-')[3]);
        var pnl = (n.c - boughtAt) * quantity;
        if(pnl > 0) {
          el.style.color = 'green';
          el.innerHTML = pnl;
          var img = $('<img style="height: 20px;width: 10px;margin-left: 10px;color: white;" id="dynamic">'); //Equivalent: $(document.createElement('img'))
          img.attr('src', 'http://www.clker.com/cliparts/8/8/2/2/11949856011357057871arrow-up-green_benji_par_01.svg');
          img.appendTo(el);
        } else {
          el.style.color = 'red';
          el.innerHTML = pnl;
          var img = $('<img style="height: 20px;width: 10px;margin-left: 10px;color: white;" id="dynamic">'); //Equivalent: $(document.createElement('img'))
          img.attr('src', 'http://www.clker.com/cliparts/3/a/4/9/11949855912003738015arrow-down-red_benji_par_01.svg');
          img.appendTo(el);

        }
      });
    }
  });
}

public onClosePortFolio(row) {
  this.updateStatus.contractid = row.contractid;
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
