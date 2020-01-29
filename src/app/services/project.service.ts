import {Injectable} from "@angular/core";
import {HttpHandlerService} from "../http-handler.service";
import {AuthService} from "../account/auth.service";
import {Project} from '../models/project.model';
import {map} from "rxjs/operators";
import {Car} from "../models/car.model";

@Injectable()
export class ProjectService {

  constructor(private http:HttpHandlerService, private auth:AuthService){}

  public projects : Project[];

  getProjectsArray() {
    return this.http.getProjects(this.auth.getUserData().email).pipe(map(res => {this.projects =res;}))
  }

}
