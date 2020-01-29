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

  // window.location.href returns the href (URL) of the current page
  // window.location.hostname returns the domain name of the web host
  // window.location.pathname returns the path and filename of the current page
  // window.location.protocol returns the web protocol used (http: or https:)
  // window.location.assign() loads a new document

  routerUrlEquals(route) {
    if (this.isMobile()) {
      const pathname = window.location.pathname;
      const pattern = new RegExp(`${route}`);
      return pattern.test(pathname);
    } else { return true; }
  }
}
