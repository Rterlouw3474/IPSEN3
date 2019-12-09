import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './account/login/login.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { ProfileComponent } from './main/profile/profile.component';
import { DeclarationsComponent } from './main/declarations/declarations.component';
import { CreateDeclarationComponent } from './main/declarations/create-declaration/create-declaration.component';
import { HeaderComponent } from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    NotfoundComponent,
    DashboardComponent,
    ProfileComponent,
    DeclarationsComponent,
    CreateDeclarationComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
