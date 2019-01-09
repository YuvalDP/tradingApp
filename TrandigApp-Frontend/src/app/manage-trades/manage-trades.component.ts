import { Component, OnInit } from '@angular/core';
import {CommonServiceService} from "../common-service.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-trades',
  templateUrl: './manage-trades.component.html',
  styleUrls: ['./manage-trades.component.css']
})
export class ManageTradesComponent implements OnInit {
public optionSelected: any;
  public manage = {
    'symbol': '',
    'userid': localStorage.getItem('userId'),
    'max_risks': null
  }
  public options: any = [];
  constructor(private router: Router, private commonService: CommonServiceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getSymbols();
  }
  // Manage Trades Method
public submitManageTrades() {
  this.commonService.UpdateManageTrades(this.manage).subscribe((res) => {
    if (res) {
      this.optionSelected = '';
      this.manage = {
        'symbol': '',
        'userid': '',
        'max_risks': null
      }
      this.toastr.success('Manage Trades Update Successfully', 'Success Message');
    }
  },(err) => {
    if (err['status'] === 401) {
      this.manage = {
        'symbol': '',
        'userid': '',
        'max_risks': null
      }
      this.toastr.error('Manage trades not updated', 'Update Failed');
    }
    console.log('error', err)
  });
}
// getting selected dropdown value
  public onOptionsSelected(event){
    this.manage.symbol = event;
  }
  // getting all symbol
  public getSymbols() {
      this.commonService.getSymbolList().subscribe((res) => {
        if (res) {
          this.options = res;
        }
      },(err) => {
        console.log('error', err)
      });
      }
}
