import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders, HttpParams
} from '@angular/common/http';
import {User} from "./main/profile/user.object";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Declaration} from "./main/declarations/declaration.object";
import {DatabaseUser} from "./models/databaseuser.model";
import {Project} from './main/profile/profile-projects/project.model';
import {Client} from './main/profile/profile-clients/client.model';
import {RDWCar} from "./models/rdwcar.model";
import {RDWFuel} from "./models/rdwfuel.model";
import {Car} from "./models/car.model";


export interface originDestinationResponse {
  beginStraatnaam: string
  beginHuisnummer: number
  beginPostcode: string
  beginPlaatsnaam: string
  beginLand: string

  eindStraatnaam: string
  eindHuisnummer: number
  eindPostcode: string
  eindPlaatsnaam: string
  eindLand: string

  distance: string
}

@Injectable()
export class HttpHandlerService {
  options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
  databaseUrl: string = "http://localhost:8080";
  googleAPI: string = "/googleapi"
  response: any;
    // "http://h2858995.stratoserver.net:8080";

  constructor(private http: HttpClient) {
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

  deleteDeclaration(url: string) {
    return this.http.delete(this.databaseUrl + url)
  }

<<<<<<< HEAD
  getDeclarations(email: string): Observable<Declaration[]> {
=======
  getDeclarations(email:string): Observable<Declaration[]>{
    // console.log(this.databaseUrl + "/declaration/get/" + email);
>>>>>>> 39a1896c129b9bf830b866a30cbbc8660838d4f9
    //return this.http.get(this.databaseUrl + "/declaration/getDeclarationsByOwnerID/" + ownerId);
    return this.http
      .get(this.databaseUrl + "/declaration/get/" + email)
      .pipe(map(res => <Declaration[]> res));
  }

<<<<<<< HEAD
  getOriginDestinationAddress(origin: string, destination: string, url: string) {
=======
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
>>>>>>> 39a1896c129b9bf830b866a30cbbc8660838d4f9

    const parameters = new HttpParams()
      .set('origin', origin)
      .set('destination', destination);

<<<<<<< HEAD
    return this.http
      .get(this.databaseUrl + this.googleAPI + url + "/" + origin + "/" + destination)
      .subscribe(response => {
        this.response = response;
      });
  }
=======





>>>>>>> 39a1896c129b9bf830b866a30cbbc8660838d4f9
}
