import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Level1Component } from './dashboard/level1/level1.component';
import { Level2Component } from './dashboard/level2/level2.component';
import { Level3Component } from './dashboard/level3/level3.component';

import { AuthGuard } from 'app/core';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/hrms/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard', component: Level1Component,
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
      },
      {
        path: 'services',
        loadChildren: () => import('./services/services.module').then(m => m.ServicesModule),
      },
      {
        path: '**', redirectTo: '/hrms/dashboard'
      },
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrmsRoutingModule { }
