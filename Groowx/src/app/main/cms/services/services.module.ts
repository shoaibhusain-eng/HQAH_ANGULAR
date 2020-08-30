import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MaterialModule } from 'app/shared/material/material.module';
import { FuseSharedModule } from '@fuse/shared.module';

import { ServicesRoutingModule } from './services-routing.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { CKEditorModule } from 'ng2-ckeditor';


@NgModule({
  declarations: [AddComponent, EditComponent, ListComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    MaterialModule,
    FuseSharedModule,
    CKEditorModule
  ]
})
export class ServicesModule { }
