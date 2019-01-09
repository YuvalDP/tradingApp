import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonServiceService} from '../app/common-service.service';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UpdateCredentialComponent } from './update-credential/update-credential.component';
import { TradeHistoryComponent } from './trade-history/trade-history.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {AuthGuard} from "./auth.guard.service";
import { ManageTradesComponent } from './manage-trades/manage-trades.component';
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    UpdateCredentialComponent,
    TradeHistoryComponent,
    NavBarComponent,
    ManageTradesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [CommonServiceService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
