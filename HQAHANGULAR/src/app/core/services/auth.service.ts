import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';
import { ConstantService } from './constant.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(
    private helperSvc: HelperService,
    private constantSvc: ConstantService,
    private router: Router,
  )  {
    this.currentUserSubject = new BehaviorSubject<any>(this.helperSvc.lsGetItem(this.constantSvc.userToken.USER_DATA));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.helperSvc.lsGetItem(this.constantSvc.userToken.USER_DATA);
  }


  public load() {
    this.helperSvc.loaderStart();
  }

  userLogout() {
    this.helperSvc.lsClear();
    this.router.navigate(['/home']);
  }
}
