import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'app/shared/material/material.module';
import { FuseSharedModule } from '@fuse/shared.module';

import { CmsRoutingModule } from './cms-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';




@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    CmsRoutingModule,
    MaterialModule,
    FuseSharedModule
  ]
})
export class CmsModule { }
