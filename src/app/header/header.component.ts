import {Component, OnInit} from '@angular/core';
import {AuthService} from '../account/auth.service';
import {HttpHandlerService} from '../http-handler.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService,
              public httpHandler: HttpHandlerService) {
  }

  ngOnInit() {
  }

  test() {
    this.httpHandler.getInteractiveRouteMap("90+hoogewaard,2396AK", "4+de+kwekerij,2396DC", '/interactiveroutemap');

  }
}
