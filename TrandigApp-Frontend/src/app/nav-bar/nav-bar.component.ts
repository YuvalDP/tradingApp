import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CommonServiceService} from "../common-service.service";
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public fullName;
  constructor(private router: Router,private commonService: CommonServiceService) { }

  ngOnInit() {
    this.fullName = localStorage.getItem('fullName');
  }
  // logout Method
  public onLogout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
