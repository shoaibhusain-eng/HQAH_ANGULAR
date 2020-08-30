import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { ServiceNavBarComponent } from './service-nav-bar/service-nav-bar.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ServiceContainerComponent } from './service-container/service-container.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RefundPolicyComponent } from './refund-policy/refund-policy.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { UserReviewComponent } from './user-review/user-review.component';
import { ServicesComponent } from './services/services.component';
import { ServiesPagesComponent } from './servies-pages/servies-pages.component';


@NgModule({
  declarations: [MainComponent, ServiceNavBarComponent, ServiceContainerComponent, ComingSoonComponent, ContactComponent, AboutUsComponent, RefundPolicyComponent, PrivacyPolicyComponent, UserReviewComponent, ServicesComponent, ServiesPagesComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    AngularMaterialModule,
    SharedModule
  ],
  exports:[
    SharedModule
  ]
})
export class MainModule { }
