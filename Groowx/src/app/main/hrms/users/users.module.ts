import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './pages/list/list.component';
import { EditComponent } from './pages/edit/edit.component';

import { MaterialModule } from 'app/shared/material/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { AddFormComponent } from './pages/add-form/add-form.component';

@NgModule({
  declarations: [ListComponent, EditComponent, AddFormComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    FuseSharedModule,
  ]
})
export class UsersModule { }
