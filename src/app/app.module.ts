import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {ProfileComponent} from './main/profile/profile.component';
import {HomeComponent} from './account/home/home.component';
import {DeclarationsComponent} from './main/declarations/declarations.component';
import {CreateDeclarationComponent} from './main/declarations/create-declaration/create-declaration.component';
import {HeaderComponent} from './header/header.component';
import {MobileSideNavComponent} from './header/mobile-side-nav/mobile-side-nav.component';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {ProfileSettingsComponent} from './main/profile/profile-settings/profile-settings.component';
import {ProfileProjectsComponent} from './main/profile/profile-projects/profile-projects.component';
import {ProjectsPopupComponent} from './main/profile/profile-projects/projects-popup/projects-popup.component';
import {DeclarationPopupComponent} from './main/declarations/declaration-popup/declaration-popup.component';
import {CarsPopupComponent} from './main/profile/profile-cars/cars-popup/cars-popup.component';
import {ClientsPopupComponent} from './main/profile/profile-clients/clients-popup/clients-popup.component';
import {ProfileCarsComponent} from './main/profile/profile-cars/profile-cars.component';
import {ProfileClientsComponent} from './main/profile/profile-clients/profile-clients.component';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpHandlerService} from './http-handler.service';
import {DatePipe, LocationStrategy, PathLocationStrategy} from '@angular/common';
// Angular material imports
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    ProfileComponent,
    DeclarationsComponent,
    CreateDeclarationComponent,
    HeaderComponent,
    MobileSideNavComponent,
    DashboardComponent,
    ProfileSettingsComponent,
    ProfileProjectsComponent,
    ProfileClientsComponent,
    ProfileCarsComponent,
    ProjectsPopupComponent,
    ClientsPopupComponent,
    CarsPopupComponent,
    DeclarationPopupComponent,
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
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    HttpHandlerService,
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    {provide: MAT_DATE_LOCALE, useValue: 'nl-NL'}, DatePipe
  ],
  bootstrap: [AppComponent],
})


export class AppModule { }

