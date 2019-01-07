import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {RegistrationComponent} from "./registration/registration.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {UpdateCredentialComponent} from "./update-credential/update-credential.component";
import {TradeHistoryComponent} from "./trade-history/trade-history.component";
import { AuthGuard } from './auth.guard.service';
import {ManageTradesComponent} from "./manage-trades/manage-trades.component";
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component:  RegistrationComponent},
  {path: 'home', component:  HomeComponent, canActivate: [AuthGuard]},
  {path: 'updateCredential', component:  UpdateCredentialComponent, canActivate: [AuthGuard]},
  {path: 'tradeHistory', component:  TradeHistoryComponent, canActivate: [AuthGuard]},
  {path: 'manageTrade', component:  ManageTradesComponent, canActivate: [AuthGuard]},
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
