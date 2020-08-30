import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatColors } from '@fuse/mat-colors';
import { HelperService, AuthGuard, AuthService } from 'app/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddComponent implements OnInit {
  action: string;
  serviceForm: FormGroup;
  dialogTitle: string;
  presetColors = MatColors.presets;
  serviceInfo = {} as any;
  teams = [];

  userId = 0;

  constructor(
    public matDialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private helperSvc: HelperService,
    private authSvc: AuthService,
  ) {
    const userData = this.authSvc.currentUserValue;
    this.userId = userData._id;
  }

  ngOnInit(): void {
    this.action = this._data.action;
    this.dialogTitle = 'Add Service Page';
    this.serviceForm = this.createServicePageForm();
    this.teams = this.helperSvc.getTeams();
  }


  createServicePageForm(): FormGroup {
    return this._formBuilder.group({
      title:  ['', Validators.required],
      title_desc: ['', Validators.required],
      sub_title: ['', Validators.required],
      sub_desc: ['', Validators.required],
      meta_data_title: ['', Validators.required],
      meta_data_desc: ['', Validators.required],
      html: [''],
      level: ['', Validators.required],
      parent_id: ['', Validators.required],
      created_by: [this.userId, Validators.required]
    });
  }

}
