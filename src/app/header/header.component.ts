import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../account/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  opened: boolean;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.opened = false;
  }

  toggleSideNav() {
    this.opened = !this.opened;
  }

  isMobile() {
    if (window.innerWidth < 768) {
      return true;
    } else { return false; }
  }

  routerUrlEquals(route) {
    if (this.isMobile()) {
      const pathname = window.location.pathname;
      const pattern = new RegExp(`${route}`);
      return pattern.test(pathname);
    } else { return true; }
  }
}
