import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatColors } from '@fuse/mat-colors';
import { HelperService, AuthGuard, AuthService } from 'app/core';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddFormComponent implements OnInit {
  action: string;
  userForm: FormGroup;
  dialogTitle: string;
  presetColors = MatColors.presets;
  userInfo = {} as any;
  teams = [];

  constructor(
    public matDialogRef: MatDialogRef<AddFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private helperSvc: HelperService,
    private authSvc: AuthService,
  ) { }

  ngOnInit() {
    this.action = this._data.action;

    if (this.action === 'edit') {
      this.dialogTitle = 'Edit User';
      this.userInfo = this._data.data;
    } else {
      this.dialogTitle = 'Add User';
    }

    this.userForm = this.createUserForm();
    this.teams = this.helperSvc.getTeams();
  }

  createUserForm(): FormGroup {
    return this._formBuilder.group({
      first_name: [this.userInfo.first_name, Validators.required],
      last_name: [this.userInfo.last_name, Validators.required],
      email: [this.userInfo.email, Validators.required],
      job_title: [this.userInfo.job_title, Validators.required],
      team: [this.userInfo.team, Validators.required],
      level: [this.userInfo.level, Validators.required],
      check_in: [this.userInfo.check_in, Validators.required],
      check_out: [this.userInfo.check_out, Validators.required],
      joining_date: [this.userInfo.joining_date, Validators.required],
      reporting_to: [this.userInfo.reporting_to, Validators.required],
      employee_type: [this.userInfo.employee_type, Validators.required]
    });
  }
}
