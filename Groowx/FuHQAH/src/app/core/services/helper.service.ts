import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, reduce } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var NProgress: any;
NProgress.configure({ showSpinner: true });

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  toastAnimate: any = 'slideFromTop';
  private history = [];
  constructor(
    private router: Router,
    private toastr: ToastrManager
  ) { }

  public loaderStart(): void {
    NProgress.start();
  }

  public loaderStop(): void {
    NProgress.done();
  }
  // Function to display success Toaster message
  public notifySuccess(msg: string = null): void {
    this.toastr.successToastr(msg, '', {
      animate: this.toastAnimate
    });
  }

  // Function to display info Toaster message
  public notifyInfo(msg: string = null): void {
    this.toastr.infoToastr(msg, '', {
      animate: this.toastAnimate
    });
  }

  // Function to display warning Toaster message
  public notifyWarnig(msg: string = null): void {
    this.toastr.warningToastr(msg, '', {
      animate: this.toastAnimate
    });
  }

  // Function to display error Toaster message
  public notifyError(msg: string = null): void {
    this.toastr.errorToastr(msg, '', {
      animate: this.toastAnimate
    });
  }

  public lsSetItem(key, value): any {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  public lsGetItem(key): any {
    return JSON.parse(localStorage.getItem(key));
  }

  public lsRemoveItem(key): any {
    return localStorage.removeItem(key);
  }

  public lsClear(): any {
    return localStorage.clear();
  }

  public ssSetItem(key, value): any {
    return sessionStorage.setItem(key, JSON.stringify(value));
  }

  public ssGetItem(key): any {
    return JSON.parse(sessionStorage.getItem(key));
  }

  public ssRemoveItem(key): any {
    return sessionStorage.removeItem(key);
  }
  
  public ssClear(): any {
    return sessionStorage.clear();
  }

  public encoder(strings): any {
    if (strings) {
      try {
        return btoa(strings);
      } catch (error) {
        return undefined;
      }
    } else {
      return null;
    }
  }

  public decoder(encodedString): any {
    if (encodedString) {
      try {
        return atob(encodedString);
      } catch (error) {
        return undefined;
      }
    } else {
      return null;
    }

  }

  public loadRouting(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
        this.history = [...this.history, urlAfterRedirects];
      });
  }

  public getHistory(): string[] {
    return this.history;
  }

  public getPreviousUrl(): string {
    return this.history[this.history.length - 2] || '/index';
  }

  getTeams() {
    const team = [
      { id: 1, title: 'Admin', alias: 'admin' },
      { id: 2, title: 'Finance/Accouts', alias: 'finance/accouts' },
      { id: 3, title: 'Marketing', alias: 'marketing' },
      { id: 4, title: 'Sales', alias: 'sales' },
      { id: 5, title: 'IT/Operations', alias: 'it/operations' },
      { id: 6, title: 'Content', alias: 'content' },
      { id: 7, title: 'HR', alias: 'hr' },
      { id: 8, title: 'Customer Support', alias: 'customer_support' },
      { id: 9, title: 'Graphics', alias: 'graphics' },
      { id: 10, title: 'Academic Content', alias: 'academic_content' },
      { id: 11, title: 'Support Staff', alias: 'support_staff' }
    ];
    return team;
  }
}
