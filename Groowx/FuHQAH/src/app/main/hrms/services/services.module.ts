import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ViewComponent } from './view/view.component';
import { MaterialModule } from 'app/shared/material/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { EcommerceProductsService } from './view/view.service';
import { ServiceFormComponent } from './service-form/service-form.component';


@NgModule({
  declarations: [ViewComponent, ServiceFormComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    MaterialModule,
    FuseSharedModule
  ],   providers   : [
    // EcommerceProductsService
  ]
})
export class ServicesModule { }
