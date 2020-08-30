import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { ApiService, HelperService, AuthService, ConstantService } from 'app/core';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { AddComponent } from '../add/add.component';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None

})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns = [
    { alias: 'sno', title: 'S No.' },
    { alias: 'title', title: 'Name' },
    { alias: '_id', title: 'Service Id' },
    { alias: 'created_by', title: 'Create By' },
    { alias: 'updated_at', title: 'Modified On' },
    { alias: 'status', title: 'Status' },
    { alias: 'action', title: 'Action' }
  ];
  displayedColumns1 = ['sno', 'title', '_id', 'created_by', 'updated_at', 'status','action'];



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
    this.serviceList();
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

  serviceList() {
    // console.log('this.tableForm.value', this.tableForm.value);
    this.apiSvc.postService(this.constantSvc.APIConfig.SERVICEPAGE_LIST, this.tableForm.value).subscribe(
      res => {
        // console.log('jjjjjjjjjjjjjjjjjjjjjjjj');
        // console.log(res);
        if (res.statusCode === 200 && res.statusType === 'success') {
          this.dataSource = res.data;
          console.log(res);
        } else {
          this.helperSvc.notifyError(res.message);
        }
      }, err => console.log('something went wrong when get users list', err)
    );
  }
  addService() {
    const dialog = this._matDialog.open(AddComponent, {
      panelClass: 'event-form-dialog',
      data: { action: 'new' }
    });

    dialog.afterClosed().subscribe((response) => {
      if (response) {
        response.data.html = response.data.title;
        console.log(response);
        this.createService(response.data);
      }
    });
  }

  createService(formdata) {
    console.log(formdata);
    this.apiSvc.postService(this.constantSvc.APIConfig.SERVICEPAGE_CREATE, formdata).subscribe(
      res => {
        console.log('res');
        console.log(res);
        if (res.statusCode === 201 && res.statusType === 'success') {
          this.serviceList();
          this.helperSvc.notifySuccess(res.message);
        } else {
          this.helperSvc.notifyError(res.message);
        }

      }, err => console.log('something went wrong when create user', err)
    );
  }

  editService(element) {
      console.log(element);
      this.router.navigate(['/cms/services/edit'], { queryParams: { id: element._id } });
  }

  deleteService(element) {
      const dialog = this._matDialog.open(FuseConfirmDialogComponent, {
          disableClose: false
      });

      dialog.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        dialog.afterClosed().subscribe(result => {
            console.log(result);
            if (result) {
                this.apiSvc.getService(this.constantSvc.APIConfig.DELETE_SERVICEPAGE, '?id=' + element._id).subscribe(
                    res => {
                        if (res.statusCode === 200 && res.statusType === 'success') {
                            this.serviceList();
                            this.helperSvc.notifySuccess(res.message);
                        } else {
                            this.helperSvc.notifyError(res.message);
                        }
                    }, err => console.log('something went wrong when delete service', err)
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
            console.log(result);
            if (result) {
                const jsonData = {
                    id: element._id,
                    status: (element.status === 'Public' ? 'Private' : 'Public')
                };
                this.apiSvc.postService(this.constantSvc.APIConfig.UPDATE_SERVICEPAGE, jsonData).subscribe(
                    res => {
                        if (res.statusCode === 200 && res.statusType === 'success') {
                            this.serviceList();
                            this.helperSvc.notifySuccess(`This page is ${jsonData.status} successfully`);
                        } else {
                            this.helperSvc.notifyError(res.message);
                        }
                    }, err => console.log('something went wrong when update service', err)
                );
            } else {
              this.serviceList();
            }
        });
    }

    isRightColumn(col) {
        const column = ['sno', 'created_by', 'updated_at', 'status', 'action'];
        if (column.includes(col)) {
            return false;
        }
        return true;
    }

    getNextPage(event) {
      console.log('getNextPage', event);
        this.tableForm.patchValue({
            currentPage: event.pageIndex,
            limit: event.pageSize,
        });
        this.serviceList();
    }

    sortData(event) {
      console.log('sortData', event);
      this.tableForm.patchValue({
            sortColumn: event.active,
            sortBy: event.direction
        });
        this.serviceList();
    }

    filterTable(event) {
      console.log('filterTable', event);
      this.tableForm.patchValue({ 
            filterColumn: this.selectedColumn,
            filter: event
        });
        this.serviceList();
    }
  // }

}
