import {Injectable} from "@angular/core";
import {HttpHandlerService} from "../http-handler.service";
import {AuthService} from "../account/auth.service";
import {Project} from '../models/project.model';

@Injectable()
export class ProjectService {

  constructor(private http:HttpHandlerService, private auth:AuthService){}

  public projects : Project[];

  getProjectsArray() {
    return this.http.getProjects(this.auth.getUserData().email).subscribe(
      res => {
        this.projects = res;
      });
  }

}
