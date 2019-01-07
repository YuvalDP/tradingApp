import { Component, OnInit } from '@angular/core';
import {CommonServiceService} from "../common-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public liveData: any = [];
  constructor(private commonService: CommonServiceService) { }

  ngOnInit() {
    this.getLivePortFolio();
  }
public getLivePortFolio() {
  this.commonService.getPortFolioData().subscribe((res) => {
    if (res) {
      this.liveData = res;
    }
  },(err) => {
    console.log('error', err)
  });
}
}
