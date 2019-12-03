import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './account/login/login.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {CreateAccountComponent} from './account/create-account/create-account.component';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {ProfileComponent} from './main/profile/profile.component';
import {DeclarationsComponent} from './main/declarations/declarations.component';
import {CreateDeclarationComponent} from './main/declarations/create-declaration/create-declaration.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateAccountComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'declarations', component: DeclarationsComponent, children: [
      { path: 'new', component: CreateDeclarationComponent }
    ]},
  { path: 'not-found', component: NotfoundComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
