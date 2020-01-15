import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './account/home/home.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { ProfileComponent } from './main/profile/profile.component';
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
import { ProjectsPopupComponent } from './main/profile/profile-projects/projects-popup/projects-popup.component';
import { DesktopDashboardComponent } from './main/dashboard/desktop/desktop-dashboard.component';
import { MobileDashboardComponent } from './main/dashboard/mobile/mobile-dashboard.component';
import {HttpHandlerService} from './http-handler.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DesktopDeclarationsComponent } from './main/declarations/desktop-declarations/desktop-declarations.component';
import { MobileDeclarationsComponent } from './main/declarations/mobile-declarations/mobile-declarations.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import {MAT_DATE_LOCALE} from '@angular/material';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    DashboardComponent,
    ProfileComponent,
    DesktopDeclarationsComponent,
    MobileDeclarationsComponent,
    CreateDeclarationComponent,
    HeaderComponent,
    DesktopDashboardComponent,
    MobileDashboardComponent,
    ProfileSettingsComponent,
    ProfileProjectsComponent,
    ProfileClientsComponent,
    ProfileCarsComponent,
    DesktopDeclarationsComponent,
    MobileDeclarationsComponent,
    ProjectsPopupComponent
  ],
  entryComponents: [
    MobileDashboardComponent,
    MobileDeclarationsComponent,
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
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [HttpHandlerService, { provide: MAT_DATE_LOCALE, useValue: 'nl-NL' }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
