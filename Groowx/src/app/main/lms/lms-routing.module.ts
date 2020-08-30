import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component'

import { AuthGuard } from 'app/core';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/lms/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard', component: DashboardComponent,
      },
      {
        path: '**', redirectTo: '/lms/dashboard'
      },
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LmsRoutingModule { }
