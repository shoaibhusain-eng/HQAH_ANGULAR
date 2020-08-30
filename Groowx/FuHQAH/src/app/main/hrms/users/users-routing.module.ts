import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './pages/list/list.component';
import { EditComponent } from './pages/edit/edit.component';
import { AuthGuard } from 'app/core';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/hrms/users/list', pathMatch: 'full' },
      {
        path: 'list', component: ListComponent,
      },
      {
        path: 'edit', component: EditComponent
      },
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
