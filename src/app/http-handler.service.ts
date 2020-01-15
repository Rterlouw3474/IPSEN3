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
    this.http.post(
      this.databaseUrl + extraUrl, declaration, this.options
    ).subscribe(responseData => {
      console.log(responseData);
    });
  }


  getUser(url: string) {
    return this.http.get(this.databaseUrl + url);
  }

  deleteDeclaration(url:string){
    return this.http.delete(this.databaseUrl + url)
  }

  getDeclarations(email:string): Observable<Declaration[]>{
    //return this.http.get(this.databaseUrl + "/declaration/getDeclarationsByOwnerID/" + ownerId);
    return this.http
      .get(this.databaseUrl + "/declaration/get/" + this.auth.getUserData().email)
      .pipe(map(res => <Declaration[]>res));
  }







}

