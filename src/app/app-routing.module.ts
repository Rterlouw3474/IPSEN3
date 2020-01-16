import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';

import {HomeComponent} from './account/home/home.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {ProfileComponent} from './main/profile/profile.component';
import {CreateDeclarationComponent} from './main/declarations/create-declaration/create-declaration.component';
import {DesktopDashboardComponent} from './main/dashboard/desktop/desktop-dashboard.component';
import {MobileDashboardComponent} from './main/dashboard/mobile/mobile-dashboard.component';
import {ApplicationStateService} from './application-state.service';
import {ProfileSettingsComponent} from './main/profile/profile-settings/profile-settings.component';
import {ProfileProjectsComponent} from './main/profile/profile-projects/profile-projects.component';
import {ProfileClientsComponent} from './main/profile/profile-clients/profile-clients.component';
import {ProfileCarsComponent} from './main/profile/profile-cars/profile-cars.component';
import {MobileDeclarationsComponent} from './main/declarations/mobile-declarations/mobile-declarations.component';
import {DesktopDeclarationsComponent} from './main/declarations/desktop-declarations/desktop-declarations.component';
import {AuthGuard} from './account/auth.guard';
import {APP_BASE_HREF} from '@angular/common';

const desktopRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DesktopDashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'profile-settings', pathMatch: 'full'},
      { path: 'profile-settings', component: ProfileSettingsComponent},
      { path: 'profile-projects', component: ProfileProjectsComponent},
      { path: 'profile-clients', component: ProfileClientsComponent},
      { path: 'profile-cars', component: ProfileCarsComponent}
    ] },
  { path: 'declarations', component: DesktopDeclarationsComponent, canActivate: [AuthGuard], children: [
      { path: 'new', component: CreateDeclarationComponent }
    ]},
  { path: 'not-found', component: NotfoundComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
];

const mobileRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: MobileDashboardComponent },
  { path: 'profile', component: ProfileComponent, children: [
      { path: '', redirectTo: 'profile-settings', pathMatch: 'full'},
      { path: 'profile-settings', component: ProfileSettingsComponent},
      { path: 'profile-projects', component: ProfileProjectsComponent},
      { path: 'profile-clients', component: ProfileClientsComponent},
      { path: 'profile-cars', component: ProfileCarsComponent}
    ] },
  { path: 'test', component: CreateDeclarationComponent },
  { path: 'declarations', component: MobileDeclarationsComponent, children: [
      { path: 'new', component: CreateDeclarationComponent }
    ]},
  { path: 'not-found', component: NotfoundComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(desktopRoutes, { useHash: true})],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue: window.location.pathname}]
})
export class AppRoutingModule {
  public constructor(private router: Router,
                     private applicationStateService: ApplicationStateService) {

    if (applicationStateService.getIsMobileResolution()) {
      router.resetConfig(mobileRoutes);
    }
  }
}
