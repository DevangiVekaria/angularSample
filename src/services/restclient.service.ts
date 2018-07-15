import { RestClient } from './../models/restclient.model';
import { Params } from './../models/params.model';
import { Auth } from './../models/auth.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, forkJoin, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RestClientService {

  constructor(private http: HttpClient) { }

  checkServices(auth: Auth): Observable<any> {
    let privateUrl = auth.private_url + "/api/status";
    let publicUrl = auth.public_url + "/api/status";
    return forkJoin(
      this.http.get<any>(privateUrl).pipe(tap(data => { }), catchError(this.handleError('checkServices', []))),
      this.http.get<any>(publicUrl).pipe(tap(data => { }), catchError(this.handleError('checkServices', [])))
    );
  }

  // checkServices(auth: Auth): Observable<any> {
  //   let privateUrl = auth.private_url +"/api/status";
  //   return this.http.get<any>(privateUrl)
  //     .pipe(
  //       tap(data =>{
  //         this.log('checked service');
  //       }),
  //       catchError(this.handleError('checkServices', []))
  //     );
  // }

  getCallApi(restClient: RestClient, params: Array<Params>): Observable<any[]> {
    let url = restClient.url;
    let queryString = "";
    if (params != null && params.length > 0) {
      params.forEach(c => {
        if (queryString == "") {
          queryString = "?" + c.key + "=" + c.value;
        } else {
          queryString += "&" + c.key + "=" + c.value;
        }
      });
    }

    return this.http.get<any>(url + queryString)
      .pipe(
        tap(data => {
          this.log('checked service');
        }),
        catchError(this.handleError('checkServices', {}))
      );
  }

  postCallApi(restClient: RestClient, params: Array<Params>): Observable<any> {
    let url = restClient.url;
    let body = "";
    if (params != null && params.length > 0) {
      body = "{"
      for (let i = 0; i < params.length; i++) {
        body += params[i].key + ":" + params[i].value;
        if (i != params.length - 1) {
          body + ","
        }
      }
      body = "}"
    }

    return this.http.post<any>(url, body)
      .pipe(
        tap(data => {
          this.log('checked service');
        }),
        catchError(this.handleError('checkServices', []))
      );

  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      //return of(result as T);
      return throwError(error);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`AuthService: ${message}`);
  }

}
