import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {LoadService} from '../../services/load.service';

@Component({
  selector: 'app-login',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  isMobile() {
    if (window.innerWidth < 768) {
      return true;
    } else { return false; }
  }

  routerUrlEquals(route) {
    if (this.isMobile()) {
      const hash = window.location.hash;
      const pattern = new RegExp(`${route}`);
      return pattern.test(hash);
    } else { return true; }
  }
}
