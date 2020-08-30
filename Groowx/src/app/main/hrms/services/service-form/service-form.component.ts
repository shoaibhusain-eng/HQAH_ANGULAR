import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Contact } from 'app/main/apps/contacts/contact.model';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ServiceFormComponent implements OnInit {

  action: string;
  serviceInfo = {} as any;
  serviceForm: FormGroup;
  dialogTitle: string;
  menuArray = [];

  constructor(
    public matDialogRef: MatDialogRef<ServiceFormComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.action = this._data.action;

    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Service';
      this.serviceInfo = this._data.service;
    } else {
      this.dialogTitle = 'New Service';
      this.menuArray = this._data.menuArray;
      this.serviceInfo = {};
      console.log(this.menuArray);
    }

    this.serviceForm = this.createContactForm();
  }

  createContactForm(): FormGroup {
    return this._formBuilder.group({
      title: [this.serviceInfo.title, Validators.required],
      title_description: [this.serviceInfo.title_description, Validators.required],
      sub_title: [this.serviceInfo.sub_title, Validators.required],
      sub_title_description: [this.serviceInfo.sub_title_description, Validators.required],
      parent_id: [this.serviceInfo.parent_id, Validators.required],
    });
  }

}
