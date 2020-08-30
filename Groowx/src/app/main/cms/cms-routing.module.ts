import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component'

import { AuthGuard } from 'app/core';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/cms/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard', component: DashboardComponent,
      },
      {
        path: 'services',
        loadChildren: () => import('./services/services.module').then(m => m.ServicesModule),
      },
      {
        path: 'setting',
        loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule),
      },
      {
        path: '**', redirectTo: '/cms/dashboard'
      },
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
