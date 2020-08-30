import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Observer, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HelperService } from './helper.service';
import { ConstantService } from './constant.service';
// import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private helperSvc: HelperService,
    private constantSvc: ConstantService,
    // private authenticationSvc: AuthService,
    private router: Router,
  ) { }

  getService(url, data): Observable<any> {
    return new Observable<any>((observer: Observer<any>) => {
      this.helperSvc.loaderStart();
      this.http.get(this.constantSvc.APIBaseURL + url + data).subscribe(
        res => {
          observer.next(res);
          observer.complete();
          this.helperSvc.loaderStop();
        }, err => {
        //   this.helperSvc.errorHandler(err);
          observer.next(err.error);
          observer.complete();
          this.helperSvc.loaderStop();
        }
      );
    });
  }

  postService(url, data): Observable<any> {
    return new Observable<any>((observer: Observer<any>) => {
      this.helperSvc.loaderStart();
      this.http.post(this.constantSvc.APIBaseURL + url, data).subscribe(
        res => {
          observer.next(res);
          observer.complete();
          this.helperSvc.loaderStop();
        }, err => {
        //   this.helperSvc.errorHandler(err);
          observer.next(err.error);
          observer.complete();
          this.helperSvc.loaderStop();
        }
      );
    });
  }

  putService(url, data): Observable<any> {
    return new Observable<any>((observer: Observer<any>) => {
      this.helperSvc.loaderStart();
      this.http.put(this.constantSvc.APIBaseURL + url, data).subscribe(
        res => {
          observer.next(res);
          observer.complete();
          this.helperSvc.loaderStop();
        }, err => {
        //   this.helperSvc.errorHandler(err);
          observer.next(err.error);
          observer.complete();
          this.helperSvc.loaderStop();
        }
      );
    });
  }

  userLogin(url, data): Observable<any> {
    return new Observable<any>((observer: Observer<any>) => {
      this.helperSvc.loaderStart();
      this.http.post(this.constantSvc.APIBaseURL + url, data).subscribe(
        res => {
          console.log(res);
          this.helperSvc.lsSetItem('USER_DATA', res);
          observer.next(res);
          observer.complete();
          this.helperSvc.loaderStop();
        }, err => {
          this.helperSvc.lsClear();
          observer.next(err.error);
          observer.complete();
          this.helperSvc.loaderStop();
        }
      );
    });
  }
}
