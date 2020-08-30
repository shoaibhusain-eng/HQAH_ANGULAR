import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ContactComponent } from './contact/contact.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { RefundPolicyComponent } from './refund-policy/refund-policy.component';
import { UserReviewComponent } from './user-review/user-review.component';
import { ServicesComponent } from './services/services.component';
import { ServiesPagesComponent } from './servies-pages/servies-pages.component';;

const routes: Routes = [
  {
    path: '', component: MainComponent
  },
  {
    path: 'contact', component:ContactComponent
  },
  {
    path: 'privacy-policy', component:PrivacyPolicyComponent
  },
  {
    path: 'refund-policy', component:RefundPolicyComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path:'user-review',component:UserReviewComponent
  },
  {
    path:'services',component:ServicesComponent
  },
  {
    path: 'coming-soon', component: ComingSoonComponent
  },
  {
    path:'service',component:ServiesPagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
