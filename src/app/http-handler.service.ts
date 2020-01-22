import { Injectable } from "@angular/core";
import {
  HttpClient, HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import {User} from "./main/profile/user.object";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Declaration} from "./main/declarations/declaration.object";
import {AuthService} from './account/auth.service';
import {DatabaseUser} from "./models/databaseuser.model";
import {Project} from './main/profile/profile-projects/project.model';
import {Client} from './main/profile/profile-clients/client.model';
import {RDWCar} from "./models/rdwcar.model";
import {RDWFuel} from "./models/rdwfuel.model";
import {Car} from "./main/profile/profile-cars/car.model";


@Injectable()
export class HttpHandlerService {
  options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
  databaseUrl: string = "http://h2858995.stratoserver.net:8080";

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  /**
   * @author Edward Deen
   * @param user
   * @param extraUrl
   */
  postUser(user: User, extraUrl: string) {
    this.http.post(
      this.databaseUrl + extraUrl, user, this.options
    ).subscribe(responseData => {
      console.log(responseData)
    });
  }

  postDeclaration(declaration: Declaration, extraUrl: string) {
    return this.http.post(
      this.databaseUrl + extraUrl, declaration, this.options
    )
  }

  updateUsername(user_email:string, new_name:string) {
    return this.http.post(
      this.databaseUrl + "/user/changename/" + user_email + "/" + new_name, this.options
    )
  }

  postProject(project: Project, extraUrl: string){
    this.http.post(
      this.databaseUrl + extraUrl, project, this.options
    ).subscribe(responseData => {
      console.log(responseData);
    });
  }

  postClient(client: Client, extraUrl: string){
    this.http.post(
      this.databaseUrl + extraUrl, client, this.options
    ).subscribe(responseData => {
      console.log(responseData)
    });
  }

  postCar(car : Car, extraUrl: string){
    this.http.post(
      this.databaseUrl + extraUrl, car, this.options
    ).subscribe(responseData => {
      console.log(responseData)
    });
  }


  getUser(userEmail:string): Observable<DatabaseUser>{
    return this.http.get(this.databaseUrl + "/user/get/" + userEmail).pipe(map(res => <DatabaseUser>res));
  }

  getRDWCar(licencePlate:string): Observable<RDWCar[]>{
    return this.http.get(this.databaseUrl + "/rdw/get/car/" + licencePlate).pipe(map(res => <RDWCar[]>res));
  }

  getRDWFuel(licencePlate:string): Observable<RDWFuel[]>{
    return this.http.get(this.databaseUrl + "/rdw/get/fuel/" + licencePlate).pipe(map(res => <RDWFuel[]>res));
  }

  deleteDeclaration(url:string){
    return this.http.delete(this.databaseUrl + url)
  }

  getDeclarations(email:string): Observable<Declaration[]>{
    // console.log(this.databaseUrl + "/declaration/get/" + email);
    //return this.http.get(this.databaseUrl + "/declaration/getDeclarationsByOwnerID/" + ownerId);
    return this.http
      .get(this.databaseUrl + "/declaration/get/" + this.auth.getUserData().email)
      .pipe(map(res => <Declaration[]>res));
  }

  getProjects(email:string): Observable<Project[]> {
    // console.log(this.databaseUrl + "/project/get/" + email);
    return this.http
      .get(this.databaseUrl + "/project/get/" + email)
      .pipe(map(res =><Project[]>res))
  }

  getClients(email:string): Observable<Client[]> {
    // console.log(this.databaseUrl + "/client/get/" + email);
    return this.http
      .get(this.databaseUrl + "/client/get/" + email)
      .pipe(map(res =><Client[]>res))
  }

  getCars(email:string): Observable<Car[]> {
    return this.http
      .get(this.databaseUrl + "/car/get/" + email)
      .pipe(map(res =><Car[]>res))
  }

}
