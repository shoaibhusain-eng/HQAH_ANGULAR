import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { ApiService, HelperService, AuthService, ConstantService } from 'app/core';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

// import { AddComponent } from '../add/add.component';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: fuseAnimations,
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  // user_id: { type: Number, required: true },
  // subject: { type: String, required: true },
  // word_count: { type: String, required: true },
  // reference_style: { type: String, required: true },
  // file: { type: Array, required: true, deafalt: null },
  // due_date: { type: Date, required: true },
  // message: { type: String, default: null },
  // coupon_code: { type: String, default: null },
  // status: { type: String, default: 'pending' },
  // assigned_employee: { type: String, default: null },
  // is_deleted: { type: Boolean, default: false }
  displayedColumns = [
    { alias: 'sno', title: 'S No.' },
    { alias: '_id', title: 'Order Id' },
    { alias: 'user_id', title: 'User Name' },

    { alias: 'subject', title: 'Subject' },
    { alias: 'word_count', title: 'Word Count' },
    { alias: 'reference_style', title: 'Reference Style' },
    { alias: 'due_date', title: 'Due Date' },
    { alias: 'message', title: 'Message' },
    { alias: 'coupon_code', title: 'Coupon Code' },
    { alias: 'status', title: 'Status' },
    { alias: 'assigned_employee', title: 'Assigned Employee' },

    { alias: 'action', title: 'Action' }
  ];
  displayedColumns1 = ['sno', '_id', 'user_id', 'subject', 'word_count', 'reference_style','due_date', 'message', 'coupon_code', 'status', 'assigned_employee', 'action'];



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
    this.leadList();
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

  leadList() {
    // console.log('this.tableForm.value', this.tableForm.value);
    this.apiSvc.postService(this.constantSvc.APIConfig.LEAD_LIST, this.tableForm.value).subscribe(
      res => {
        console.log('jjjjjjjjjjjjjjjjjjjjjjjj');
        console.log(res);
        if (res.statusCode === 200 && res.statusType === 'success') {
          this.dataSource = res.data;
          console.log(res);
        } else {
          this.helperSvc.notifyError(res.message);
        }
      }, err => console.log('something went wrong when get lead list', err)
    );
  }
  // addService() {
  //   const dialog = this._matDialog.open(AddComponent, {
  //     panelClass: 'event-form-dialog',
  //     data: { action: 'new' }
  //   });

  //   dialog.afterClosed().subscribe((response) => {
  //     if (response) {
  //       response.data.html = response.data.title;
  //       console.log(response);
  //       this.createService(response.data);
  //     }
  //   });
  // }

  createService(formdata) {
    console.log(formdata);
    this.apiSvc.postService(this.constantSvc.APIConfig.SERVICEPAGE_CREATE, formdata).subscribe(
      res => {
        console.log('res');
        console.log(res);
        if (res.statusCode === 201 && res.statusType === 'success') {
          this.leadList();
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
                          this.leadList();
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
                this.apiSvc.putService(this.constantSvc.APIConfig.UPDATE_SERVICEPAGE, jsonData).subscribe(
                    res => {
                        if (res.statusCode === 200 && res.statusType === 'success') {
                            this.leadList();
                            this.helperSvc.notifySuccess(`This page is ${jsonData.status} successfully`);
                        } else {
                            this.helperSvc.notifyError(res.message);
                        }
                    }, err => console.log('something went wrong when update service', err)
                );
            } else {
              this.leadList();
            }
        });
    }

    isRightColumn(col) {
        const column = ['sno', 'due_date', 'action'];
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
        this.leadList();
    }

    sortData(event) {
      console.log('sortData', event);
      this.tableForm.patchValue({
            sortColumn: event.active,
            sortBy: event.direction
        });
        this.leadList();
    }

    filterTable(event) {
      console.log('filterTable', event);
      this.tableForm.patchValue({ 
            filterColumn: this.selectedColumn,
            filter: event
        });
        this.leadList();
    }



}
