import { Component, OnInit } from '@angular/core';
import {CommonServiceService} from "../common-service.service";
@Component({
  selector: 'app-trade-history',
  templateUrl: './trade-history.component.html',
  styleUrls: ['./trade-history.component.css']
})
export class TradeHistoryComponent implements OnInit {
public tradeHistoryList: any = [];
  constructor(private commonService: CommonServiceService) { }

  ngOnInit() {
    this.getTradeHistoryData();
  }
  // getting tradeHistory Data
  public getTradeHistoryData() {
    const id = localStorage.getItem('userId');
    this.commonService.getTradeHistory(id).subscribe((res) => {
      if (res) {
        this.tradeHistoryList = res;
      }
    },(err) => {
      console.log('error', err)
    });
  }
}
