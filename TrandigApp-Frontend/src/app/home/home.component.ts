import { Component, OnInit } from '@angular/core';
import {CommonServiceService} from "../common-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public liveData: any = [];
  constructor(private commonService: CommonServiceService,private router: Router) { }

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
}
