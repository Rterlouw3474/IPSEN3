import { Component, OnInit } from '@angular/core';
import {AuthService} from '../account/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

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
