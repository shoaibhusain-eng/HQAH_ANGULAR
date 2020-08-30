import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatColors } from '@fuse/mat-colors';
import { HelperService, AuthGuard, AuthService } from 'app/core';

@Component({
  selector: 'app-add-tmp',
  templateUrl: './add-tmp.component.html',
  styleUrls: ['./add-tmp.component.scss']
})
export class AddTmpComponent implements OnInit {

  action: string;
  templeteForm: FormGroup;
  dialogTitle: string;
  presetColors = MatColors.presets;
  userId: any;

  constructor(
    public matDialogRef: MatDialogRef<AddTmpComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private helperSvc: HelperService,
    private authSvc: AuthService,
  ) {
    const userInfo = this.authSvc.currentUserValue;
    this.userId = userInfo._id;
  }

  ngOnInit() {
    this.action = this._data.action;

    this.dialogTitle = 'Add Template';

    this.templeteForm = this.createTmpForm();
  }

  createTmpForm(): FormGroup {
    return this._formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      created_by: [this.userId, Validators.required],
      html_content: ['No content', Validators.required],
    });
  }


}
