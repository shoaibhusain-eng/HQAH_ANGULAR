import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { ApiService, HelperService, AuthService, ConstantService } from 'app/core';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { AddTmpComponent } from '../add-tmp/add-tmp.component';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-tmp',
  templateUrl: './list-tmp.component.html',
  styleUrls: ['./list-tmp.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class ListTmpComponent implements OnInit {
  displayedColumns = [
    { alias: 'sno', title: 'S No.' },
    { alias: 'title', title: 'Title' },
    { alias: 'created_by', title: 'Create By' },
    { alias: 'updated_at', title: 'Modified On' },
    { alias: 'status', title: 'Status' },
    { alias: 'action', title: 'Action' }
  ];
  displayedColumns1 = ['sno', 'title', 'created_by', 'updated_at', 'status', 'action'];



  dataSource: any;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  tableForm: FormGroup;
  selectedColumn = '';

  constructor(
    private _matDialog: MatDialog,
    private authSvc: AuthService,
    private apiSvc: ApiService,
    private helperSvc: HelperService,
    private constantSvc: ConstantService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initTable();
    this.tmpList();
  }

  initTable() {
    this.tableForm = this.fb.group({
      currentPage: [0],
      limit: [5],
      sortColumn: ['_id'],
      sortBy: ['asc'],
      filterColumn: [''],
      filter: ['']
    });
  }

  addTemplete() {
    const dialog = this._matDialog.open(AddTmpComponent, {
      panelClass: 'event-form-dialog',
      data: { action: 'new' }
    });

    dialog.afterClosed().subscribe((response) => {
      console.log(response);
      if (response) {
        this.createTmp(response.data)
      }
    });
  }

  createTmp(formdata) {
    this.apiSvc.postService(this.constantSvc.APIConfig.TEMPLATE_CREATE, formdata).subscribe(
      res => {
        if (res.statusCode === 201 && res.statusType === 'success') {
          this.router.navigate(['/cms/setting/template-edit'], { queryParams: { id: res.data }, skipLocationChange: true });
        } else {
          this.helperSvc.notifyError(res.message);
        }

      }, err => console.log('something went wrong when create Template', err)
    );
  }

  tmpList() {
    this.apiSvc.postService(this.constantSvc.APIConfig.TEMPLATE_LIST, this.tableForm.value).subscribe(
      res => {
        if (res.statusCode === 200 && res.statusType === 'success') {
          this.dataSource = res.data;
          console.log(res);
          // this.usersList();
          // this.helperSvc.notifySuccess(res.message);
        } else {
          this.helperSvc.notifyError(res.message);
        }

      }, err => console.log('something went wrong when create Template', err)
    );
  }

  isRightColumn(col) {
    const column = ['sno', 'updated_at','created_by', 'status', 'action'];
    if (column.includes(col)) {
      return false;
    }
    return true;
  }

  editTmp(element) {
    this.router.navigate(['/cms/setting/template-edit'], { queryParams: { id: element._id } });
  }

  deleteTmp(element) {
    const dialog = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    dialog.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.apiSvc.getService(this.constantSvc.APIConfig.TEMPLATE_DELETE, '?id=' + element._id).subscribe(
          res => {
            if (res.statusCode === 200 && res.statusType === 'success') {
              this.tmpList();
              this.helperSvc.notifySuccess(res.message);
            } else {
              this.helperSvc.notifyError(res.message);
            }
          }, err => console.log('something went wrong when delete Template', err)
        );
      }
    });
  }

  changeStatus(element) {
    const dialog = this._matDialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    dialog.componentInstance.confirmMessage = 'Are you sure you want to change status?';

    dialog.afterClosed().subscribe(result => {
      if (result) {
        const jsonData = {
          id: element._id,
          status: (element.status === 'Active' ? 'Inactive' : 'Active')
        };
        this.apiSvc.putService(this.constantSvc.APIConfig.TEMPLATE_UPDATE, jsonData).subscribe(
          res => {
            if (res.statusCode === 200 && res.statusType === 'success') {
              this.tmpList();
              this.helperSvc.notifySuccess('Status updated successfully');
            } else {
              this.helperSvc.notifyError(res.message);
            }
          }, err => console.log('something went wrong when update Template', err)
        );
      } else {
        this.tmpList();
      }
    });
  }

  getNextPage(event) {
    console.log('getNextPage', event);
    this.tableForm.patchValue({
      currentPage: event.pageIndex,
      limit: event.pageSize,
    });
    this.tmpList();
  }

  sortData(event) {
    console.log('sortData', event);
    this.tableForm.patchValue({
      sortColumn: event.active,
      sortBy: event.direction
    });
    this.tmpList();
  }

  filterTable(event) {
    console.log('filterTable', event);
    this.tableForm.patchValue({
      filterColumn: this.selectedColumn,
      filter: event
    });
    this.tmpList();
  }
}
