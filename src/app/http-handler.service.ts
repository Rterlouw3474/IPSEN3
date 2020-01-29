import { Injectable } from "@angular/core";
import {
  HttpClient, HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import {User} from "./models/user.model";
import {Observable, throwError} from "rxjs";
import {catchError, map, repeat} from 'rxjs/operators';
import {Declaration} from "./models/declaration.object";
import {AuthService} from './account/auth.service';
import {Project} from './models/project.model';
import {Client} from './models/client.model';
import {RDWCar} from "./models/rdwcar.model";
import {RDWFuel} from "./models/rdwfuel.model";
import {Car} from "./models/car.model";
import {GoogleresponseModel} from './models/googleresponse.model';
import {error, log} from 'util';


@Injectable()
export class HttpHandlerService {
  options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
  databaseUrl: string = "http://localhost:8080"
    "http://h2858995.stratoserver.net:8080";
  googleAPI: string = "/googleapi"
  private response: any;

  constructor(private http: HttpClient, private auth: AuthService) {
  }


  postDeclaration(declaration: Declaration, extraUrl: string) {
    return this.http.post(
      this.databaseUrl + extraUrl, declaration, {responseType: 'text', headers: new HttpHeaders().set('Content-Type', 'application/json')}
    )
  }

  updateUsername(user_email:string, new_name:string) {
    return this.http.post(
      this.databaseUrl + "/user/changename/" + user_email + "/" + new_name, this.options
    )
  }

  postClient(client: Client, extraUrl: string){
    return this.http.post(
      this.databaseUrl + extraUrl, client, {responseType: 'text'}
    )
  }

  postProject(project: Project, extraUrl: string){
    return this.http.post(
      this.databaseUrl + extraUrl, project, {responseType: 'text'}
    )}

  postCar(car : Car, extraUrl: string){
    return this.http.post(
      this.databaseUrl + extraUrl, car, {responseType: 'text'}
    )}

  postUser(user: User, extraUrl: String) {
    this.http.post(
      this.databaseUrl + extraUrl, user, {responseType: 'text'}
    ).subscribe(responseData => {
      console.log(responseData)
    })
  }

  getUser(userEmail:string): Observable<User>{
    return this.http.get<User>(this.databaseUrl + "/user/get/" + userEmail, {responseType: 'json'})
      .pipe(map(
        res => <User>res,
                userDoesntExist => this.response = userDoesntExist
      ));
  }

  getRDWCar(licencePlate:string): Observable<RDWCar[]>{
    return this.http.get(this.databaseUrl + "/rdw/get/car/" + licencePlate, {responseType: 'json'}).pipe(map(res => <RDWCar[]>res));
  }

  getRDWFuel(licencePlate:string): Observable<RDWFuel[]>{
    return this.http.get(this.databaseUrl + "/rdw/get/fuel/" + licencePlate, {responseType: 'json'}).pipe(map(res => <RDWFuel[]>res));
  }

  deleteDeclaration(url:string){
    return this.http.delete(this.databaseUrl + url, {responseType: 'text'});
  }

  deleteProject(url:string) {
    return this.http.delete(this.databaseUrl + url, {responseType: 'text'});
  }

  getDeclarations(email:string): Observable<Declaration[]>{
    // console.log(this.databaseUrl + "/declaration/get/" + email);
    //return this.http.get(this.databaseUrl + "/declaration/getDeclarationsByOwnerID/" + ownerId);
    return this.http
      .get(this.databaseUrl + "/declaration/get/" + this.auth.getUserData().email, {responseType: 'json'})
      .pipe(map(res => <Declaration[]>res));
  }

  getProjects(email:string): Observable<Project[]> {
    // console.log(this.databaseUrl + "/project/get/" + email);
    return this.http
      .get(this.databaseUrl + "/project/get/" + email, {responseType: 'json'})
      .pipe(map(res => <Project[]>res))
  }

  getClients(email:string): Observable<Client[]> {
    // console.log(this.databaseUrl + "/client/get/" + email);
    return this.http
      .get(this.databaseUrl + "/client/get/" + email, {responseType: 'json'})
      .pipe(map(res => <Client[]>res))
  }

  getCars(email:string): Observable<Car[]> {
    return this.http
      .get(this.databaseUrl + "/car/get/" + email, {responseType: 'json'})
      .pipe(map(res => <Car[]>res))
  }

  getInteractiveRouteMap(url: string, origin: string, destination: string): Observable<string> {
    return this.http
      .get(this.databaseUrl + this.googleAPI + url + "/" + origin + "/" + destination, {responseType: 'text'})
      .pipe(map(response => <string>response))
  }

  getOriginDestinationAndDistance(url: string, origin: string, destination: string): Observable<GoogleresponseModel> {
    return this.http
      .get(this.databaseUrl + this.googleAPI + url + "/" + origin + "/" + destination, {responseType: 'json'})
      .pipe(map(response => <GoogleresponseModel>response));
  }

}
