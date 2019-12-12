import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';

import {LoginComponent} from './account/login/login.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {CreateAccountComponent} from './account/create-account/create-account.component';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {ProfileComponent} from './main/profile/profile.component';
import {DeclarationsComponent} from './main/declarations/declarations.component';
import {CreateDeclarationComponent} from './main/declarations/create-declaration/create-declaration.component';
import {DesktopDashboardComponent} from './main/dashboard/desktop/desktop-dashboard.component';
import {MobileDashboardComponent} from './main/dashboard/mobile/mobile-dashboard.component';
import {ApplicationStateService} from './application-state.service';
import {ProfileSettingsComponent} from './main/profile/profile-settings/profile-settings.component';
import {ProfileProjectsComponent} from './main/profile/profile-projects/profile-projects.component';
import {ProfileClientsComponent} from './main/profile/profile-clients/profile-clients.component';
import {ProfileCarsComponent} from './main/profile/profile-cars/profile-cars.component';

const desktopRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateAccountComponent },
  { path: 'dashboard', component: DesktopDashboardComponent },
  { path: 'profile', component: ProfileComponent, children: [
      { path: '', redirectTo: 'profile-settings', pathMatch: 'full'},
      { path: 'profile-settings', component: ProfileSettingsComponent},
      { path: 'profile-projects', component: ProfileProjectsComponent},
      { path: 'profile-clients', component: ProfileClientsComponent},
      { path: 'profile-cars', component: ProfileCarsComponent}
    ] },
  { path: 'test', component: CreateDeclarationComponent },
  { path: 'declarations', component: DeclarationsComponent, children: [
      { path: 'new', component: CreateDeclarationComponent }
    ]},
  { path: 'not-found', component: NotfoundComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
];

const mobileRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateAccountComponent },
  { path: 'dashboard', component: MobileDashboardComponent },
  { path: 'profile', component: ProfileComponent, children: [
      { path: '', redirectTo: 'profile-settings', pathMatch: 'full'},
      { path: 'profile-settings', component: ProfileSettingsComponent},
      { path: 'profile-projects', component: ProfileProjectsComponent},
      { path: 'profile-clients', component: ProfileClientsComponent},
      { path: 'profile-cars', component: ProfileCarsComponent}
    ] },
  { path: 'test', component: CreateDeclarationComponent },
  { path: 'declarations', component: DeclarationsComponent, children: [
      { path: 'new', component: CreateDeclarationComponent }
    ]},
  { path: 'not-found', component: NotfoundComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
];

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateAccountComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent, children: [
      { path: '', redirectTo: 'profile-settings', pathMatch: 'full'},
      { path: 'profile-settings', component: ProfileSettingsComponent},
      { path: 'profile-projects', component: ProfileProjectsComponent},
      { path: 'profile-clients', component: ProfileClientsComponent},
      { path: 'profile-cars', component: ProfileCarsComponent}
    ] },
  { path: 'test', component: CreateDeclarationComponent },
  { path: 'declarations', component: DeclarationsComponent, children: [
      { path: 'new', component: CreateDeclarationComponent }
    ]},
  { path: 'not-found', component: NotfoundComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(desktopRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public constructor(private router: Router,
                     private applicationStateService: ApplicationStateService) {

    if (applicationStateService.getIsMobileResolution()) {
      router.resetConfig(mobileRoutes);
    }
  }
}
