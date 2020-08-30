import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { AssignmentOrderComponent } from './assignment-order/assignment-order.component';
import { NotificationComponent } from './notification/notification.component';
import { OfferComponent } from './offer/offer.component';
import { ProfileComponent } from './profile/profile.component';
import { WalletComponent } from './wallet/wallet.component';


const routes: Routes = [
  {
    path: '', component: UserComponent
  },
  {
    path: 'assignment-order', component: AssignmentOrderComponent,
  },
  {
    path: 'notification', component: NotificationComponent,
  },
  {
    path: 'offer', component: OfferComponent,
  },
  {
    path: 'wallet', component: WalletComponent,
  },
  {
    path: 'profile', component: ProfileComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
