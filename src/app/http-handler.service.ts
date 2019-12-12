import { Injectable } from "@angular/core";
import {
  HttpClient, HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import {Encoding} from "tslint/lib/utils";
import {User} from "./main/profile/user.model";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable()
export class HttpHandlerService {
  options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  databaseUrl: string = "http://85.214.137.224:8080";

  constructor(private http: HttpClient) {}

  getSomething(url: string) {
    return this.http.get(this.databaseUrl + url, this.options);
  }

  /**
   * @author Edward Deen
   * @param user
   * @param extraUrl
   */
  postUser(user: User, extraUrl:string) {
    this.http.post(
      this.databaseUrl + extraUrl, user, this.options
    ).subscribe(responseData => {
      console.log(responseData)
    });
  }

  public getListOfGroup(url: string): Observable<any> {

    // Call the http GET
    return this.http.get(this.databaseUrl + url, this.options).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }

  /**
   * Function to extract the data when the server return some
   *
   * @param res
   */
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
}
