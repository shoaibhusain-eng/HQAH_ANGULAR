import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { ApiService, HelperService, AuthService, ConstantService } from 'app/core';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { AddFormComponent } from '../add-form/add-form.component';
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
        { title: 'Id', alias: '_id' },
        { title: 'Name', alias: 'name' },
        { title: 'Team', alias: 'team' },
        { title: 'Job Title', alias: 'job_title' },
        { title: 'Level', alias: 'level' },
        { title: 'Status', alias: 'status' },
        { title: 'Action', alias: 'action' },
    ];
    displayedColumns1 = ['_id', 'name', 'team', 'job_title', 'level', 'status', 'action'];

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
        this.usersList();
    }

    initTable() {
        this.tableForm = this.fb.group({
            currentPage: [0],
            limit: [5],
            sortColumn: ['_id'],
            sortBy: ['desc'],
            filterColumn: [''],
            filter: ['']
        });
    }

    usersList() {
        this.apiSvc.postService(this.constantSvc.APIConfig.USERS_LIST, this.tableForm.value).subscribe(
            res => {
                console.log(res);
                if (res.statusCode === 200 && res.statusType === 'success') {
                    this.dataSource = res.data;
                } else {
                    this.helperSvc.notifyError(res.message);
                }
            }, err => console.log('something went wrong when get users list', err)
        );
    }

    addUser() {
        const dialog = this._matDialog.open(AddFormComponent, {
            panelClass: 'event-form-dialog',
            data: { action: 'new' }
        });

        dialog.afterClosed().subscribe((response) => {
            if (response) {
                this.createUser(response.data);
            }
        });
    }

    createUser(formdata) {
        this.apiSvc.postService(this.constantSvc.APIConfig.USER_CREATE, formdata).subscribe(
            res => {
                if (res.statusCode === 201 && res.statusType === 'success') {
                    this.usersList();
                    this.helperSvc.notifySuccess(res.message);
                } else {
                    this.helperSvc.notifyError(res.message);
                }

            }, err => console.log('something went wrong when create user', err)
        );
    }

    editUser(element) {
        this.router.navigate(['/hrms/users/edit'], { queryParams: { id: element._id } });
    }

    deleteUser(element) {
        const dialog = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        dialog.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        dialog.afterClosed().subscribe(result => {
            if (result) {
                this.apiSvc.getService(this.constantSvc.APIConfig.DELETE_USER, '?id=' + element._id).subscribe(
                    res => {
                        if (res.statusCode === 200 && res.statusType === 'success') {
                            this.usersList();
                            this.helperSvc.notifySuccess(res.message);
                        } else {
                            this.helperSvc.notifyError(res.message);
                        }
                    }, err => console.log('something went wrong when delete user', err)
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
                    status: (element.status === 'active' ? 'suspended' : 'active')
                };
                this.apiSvc.postService(this.constantSvc.APIConfig.UPDATE_USER, jsonData).subscribe(
                    res => {
                        if (res.statusCode === 200 && res.statusType === 'success') {
                            this.usersList();
                            this.helperSvc.notifySuccess('Status updated successfully');
                        } else {
                            this.helperSvc.notifyError(res.message);
                        }
                    }, err => console.log('something went wrong when update user', err)
                );
            } else {
                this.usersList();
            }
        });
    }

    isRightColumn(col) {
        const column = ['name', 'action', 'team', 'status'];
        if (column.includes(col)) {
            return false;
        }
        return true;
    }

    getNextPage(event) {
        this.tableForm.patchValue({
            currentPage: event.pageIndex,
            limit: event.pageSize,
        });
        this.usersList();
    }

    sortData(event) {
        this.tableForm.patchValue({
            sortColumn: event.active === 'name' ? 'first_name' : event.active,
            sortBy: event.direction
        });
        this.usersList();
    }

    filterTable(event) {
        this.tableForm.patchValue({
            filterColumn: this.selectedColumn === 'name' ? 'first_name' : this.selectedColumn,
            filter: event
        });
        this.usersList();
    }

}
