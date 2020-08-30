import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HelperService, ConstantService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class LoginActiveGuard implements CanActivate {

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private helperSvc: HelperService,
    private constantSvc: ConstantService
  ) { }

  canActivate(): any{
    const currentUser = this.authSvc.currentUserValue;
    if (currentUser) {
      this.router.navigate(['/hrms/dashboard']);
      return false;
    }

    return true;
  }

}
