import { AuthService, ApiService, ConstantService, HelperService } from 'app/core';
import { Router } from '@angular/router';

import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { takeUntil } from 'rxjs/internal/operators';
import { MatDialog } from '@angular/material/dialog';
import { ServiceFormComponent } from 'app/main/hrms/services/service-form/service-form.component';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ViewComponent implements OnInit {

  menuArray = [];

  i = 0;

  private _unsubscribeAll: Subject<any>;

  constructor(
    // private authSvc: AuthService,
    private apiSvc: ApiService,
    private constantSvc: ConstantService,
    private helperSvc: HelperService,
    private router: Router,
    // private _fuseSidebarService: FuseSidebarService,
    private _matDialog: MatDialog
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.serviceMenu();
  }

  build_menu(rows, parent) {
    // console.log('i1', this.i++);
    let result = '<ul>';

    rows.forEach(E => {
      // console.log('i2', this.i++);

      if (E.parent_id === parent) {
        result += '<li>' + ' [' + E._id + '] ' + E.title;
        if (this.has_child(rows, E._id)) {
          result += this.build_menu(rows, E._id);
        }
        result += '</li>';
      }
    });
    result += '</ul>';

    return result;
  }

  has_child(row, id) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < row.length; i++) {
      if (row[i].parent_id === id) {
        return true;
      }
    }
    return false;
  }

  serviceMenu() {
    this.apiSvc.getService(this.constantSvc.APIConfig.SERVICE_LIST, '').subscribe(
      res => {
        if (res.statusCode === 200 && res.statusType === 'success') {
          this.menuArray = res.data;
          this.build_menu(this.menuArray, 0);
        } else {
          this.helperSvc.notifyError(res.message);
        }
      },
      err => console.log('error in serviceMenu API', err)
    );
  }

  addService() {
      const dialogRef = this._matDialog.open(ServiceFormComponent, {
          panelClass: 'contact-form-dialog',
          data      : {
              action: 'new',
              menuArray: this.menuArray
          }
      });

      dialogRef.afterClosed().subscribe((response) => {
        console.log(response);
        if (response) {
          const type = response.type;
          const data = response.data;
          this.onSubmit(data);
        }
      });
  }

  onSubmit(formdata) {
    this.apiSvc.postService(this.constantSvc.APIConfig.SERVICE_CREATE, formdata).subscribe(
      res => {
        if (res.statusCode === 201 && res.statusType === 'success') {
          this.serviceMenu();
          this.helperSvc.notifySuccess(res.message);
        } else {
          this.helperSvc.notifyError(res.message);
        }

      }, err => console.log('something went wrong when create service', err)
    );
  }
}
