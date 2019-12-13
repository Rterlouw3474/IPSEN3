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
import {ProfileSettingsComponent} from './main/profile/profile-settings/profile-settings.component';
import { ProfileProjectsComponent } from './main/profile/profile-projects/profile-projects.component';
import { ProfileClientsComponent } from './main/profile/profile-clients/profile-clients.component';
import { ProfileCarsComponent } from './main/profile/profile-cars/profile-cars.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {HttpHandlerService} from "./http-handler.service";
import {FormsModule} from "@angular/forms";

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
    ProfileSettingsComponent,
    ProfileProjectsComponent,
    ProfileClientsComponent,
    ProfileCarsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [HttpHandlerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
