import {Component, OnInit} from "@angular/core";
import {User} from "../../models/user.model";
import {DatabaseUser} from "../../models/databaseuser.model";
import {Declaration} from "../../models/declaration.object";
import {HttpHandlerService} from "../../http-handler.service";
import {AuthService} from "../../account/auth.service";
import {ApplicationStateService} from "../../application-state.service";
import {DeclarationService} from "../../services/declaration.service";
import {UserService} from "../../services/user.service";
import {LoadService} from "../../services/load.service";


@Component({
  selector: 'app-desktop-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {



  constructor(private applicationStateService: ApplicationStateService, private http: HttpHandlerService,
              private auth: AuthService, private decService: DeclarationService, private userService: UserService,
              private load: LoadService) { }

  ngOnInit() {
  }

  isMobile() {
    return this.applicationStateService.getIsMobileResolution();
  }


}
