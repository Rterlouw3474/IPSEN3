import { Injectable } from "@angular/core";
import {
  HttpClient, HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Declaration} from "./models/declaration.object";
import {DatabaseUser} from "./models/databaseuser.model";
import {Project} from './main/profile/profile-projects/project.model';
import {Client} from './main/profile/profile-clients/client.model';
import {RDWCar} from "./models/rdwcar.model";
import {RDWFuel} from "./models/rdwfuel.model";
import {Car} from "./models/car.model";


@Injectable()
export class HttpHandlerService {
  options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
  databaseUrl: string = "http://localhost:8080";

  constructor(private http: HttpClient) {
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
      console.log(responseData)
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
    //return this.http.get(this.databaseUrl + "/declaration/getDeclarationsByOwnerID/" + ownerId);
    return this.http
      .get(this.databaseUrl + "/declaration/get/" + email)
      .pipe(map(res => <Declaration[]>res));
  }







}
