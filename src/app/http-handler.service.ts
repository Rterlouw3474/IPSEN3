import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders, HttpParams
} from '@angular/common/http';
import {User} from "./main/profile/user.object";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Declaration} from "./main/declarations/declaration.object";

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


  getUser(url: string) {
    return this.http.get(this.databaseUrl + url);
  }

  deleteDeclaration(url: string) {
    return this.http.delete(this.databaseUrl + url)
  }

  getDeclarations(email: string): Observable<Declaration[]> {
    //return this.http.get(this.databaseUrl + "/declaration/getDeclarationsByOwnerID/" + ownerId);
    return this.http
      .get(this.databaseUrl + "/declaration/get/" + email)
      .pipe(map(res => <Declaration[]> res));
  }

  getOriginDestinationAddress(origin: string, destination: string, url: string) {

    const parameters = new HttpParams()
      .set('origin', origin)
      .set('destination', destination);

    return this.http
      .get(this.databaseUrl + this.googleAPI + url + "/" + origin + "/" + destination)
      .subscribe(response => {
        this.response = response;
      });
  }
}
