import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {NotfoundComponent} from "./notfound/notfound.component";
import {ProfileComponent} from "./main/profile/profile.component";
import {HomeComponent} from "./account/home/home.component";
import {DeclarationsComponent} from "./main/declarations/declarations.component";
import {CreateDeclarationComponent} from "./main/declarations/create-declaration/create-declaration.component";
import {HeaderComponent} from "./header/header.component";
import {DashboardComponent} from "./main/dashboard/dashboard.component";
import {ProfileSettingsComponent} from "./main/profile/profile-settings/profile-settings.component";
import {ProfileProjectsComponent} from "./main/profile/profile-projects/profile-projects.component";
import {ProjectsPopupComponent} from "./main/profile/profile-projects/projects-popup/projects-popup.component";
import {DeclarationPopupComponent} from "./main/declarations/declaration-popup/declaration-popup.component";
import {CarsPopupComponent} from "./main/profile/profile-cars/cars-popup/cars-popup.component";
import {ClientsPopupComponent} from "./main/profile/profile-clients/clients-popup/clients-popup.component";
import {ProfileCarsComponent} from "./main/profile/profile-cars/profile-cars.component";
import {ProfileClientsComponent} from "./main/profile/profile-clients/profile-clients.component";
import {HttpHandlerService} from "./http-handler.service";
import {DeclarationService} from "./services/declaration.service";
import {UserService} from "./services/user.service";
import {LoadService} from "./services/load.service";
import { DeletePopupComponent } from './main/shared/delete-popup/delete-popup.component';
import {
  MAT_DATE_LOCALE,
  MatCheckboxModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule, MatOptionModule,
  MatProgressSpinnerModule,
  MatSelectModule
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {CarService} from './services/car.service';
import {ClientService} from './services/client.service';
import {ProjectService} from './services/project.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    ProfileComponent,
    DeclarationsComponent,
    CreateDeclarationComponent,
    HeaderComponent,
    DashboardComponent,
    ProfileSettingsComponent,
    ProfileProjectsComponent,
    ProfileClientsComponent,
    ProfileCarsComponent,
    ProjectsPopupComponent,
    ClientsPopupComponent,
    CarsPopupComponent,
    DeletePopupComponent,
    CarsPopupComponent,
    DeclarationPopupComponent
  ],
  entryComponents: [
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
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatSelectModule

  ],
  providers: [HttpHandlerService, DeclarationService, CarService, ClientService, ProjectService, UserService, LoadService, {provide: LocationStrategy, useClass: HashLocationStrategy}, {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
