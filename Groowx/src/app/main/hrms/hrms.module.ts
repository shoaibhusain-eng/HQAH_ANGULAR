import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrmsRoutingModule } from './hrms-routing.module';
import { Level1Component } from './dashboard/level1/level1.component';
import { Level2Component } from './dashboard/level2/level2.component';
import { Level3Component } from './dashboard/level3/level3.component';

import { MaterialModule } from 'app/shared/material/material.module';
import { FuseSharedModule } from '@fuse/shared.module';

@NgModule({
  declarations: [Level1Component, Level2Component, Level3Component],
  imports: [
    CommonModule,
    HrmsRoutingModule,
    MaterialModule,
    FuseSharedModule,
  ]
})
export class HrmsModule { }
