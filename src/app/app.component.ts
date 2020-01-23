import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {slideInAnimation} from "./models/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'DigitaleFactuur – Kilometer Registratie';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
