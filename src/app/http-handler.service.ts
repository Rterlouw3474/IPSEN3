import { Injectable } from "@angular/core";
import {
  HttpClient, HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import {User} from "./main/profile/user.object";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Declaration} from "./main/declarations/declaration.object";

@Injectable()
export class HttpHandlerService {
  options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
  databaseUrl: string = "http://h2858995.stratoserver.net:8080";

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
    this.http.post(
      this.databaseUrl + extraUrl, declaration, this.options
    ).subscribe(responseData => {
      console.log(responseData)
    });
  }


  getUser(url: string) {
    return this.http.get(this.databaseUrl + url);
  }


}

