import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { AddTmpComponent } from './template/add-tmp/add-tmp.component';
import { ListTmpComponent } from './template/list-tmp/list-tmp.component';
import { EditTmpComponent } from './template/edit-tmp/edit-tmp.component';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from 'app/shared/material/material.module';
import { CKEditorModule } from 'ng2-ckeditor';


@NgModule({
  declarations: [AddTmpComponent, ListTmpComponent, EditTmpComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MaterialModule,
    FuseSharedModule,
    CKEditorModule
  ]
})
export class SettingModule { }
