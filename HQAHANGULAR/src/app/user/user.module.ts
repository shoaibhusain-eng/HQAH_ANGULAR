import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { WalletComponent } from './wallet/wallet.component';
import { ProfileComponent } from './profile/profile.component';
import { OfferComponent } from './offer/offer.component';
import { NotificationComponent } from './notification/notification.component';
import { AssignmentOrderComponent } from './assignment-order/assignment-order.component';



@NgModule({
  declarations: [UserComponent, WalletComponent, ProfileComponent, OfferComponent, NotificationComponent, AssignmentOrderComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  exports:[
    SharedModule
  ]
})
export class UserModule { }
