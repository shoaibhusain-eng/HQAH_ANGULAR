import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';



const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/cms/services/list', pathMatch: 'full' },
      {
        path: 'list', component: ListComponent,
      },
      {
        path: 'edit', component: EditComponent,
      },
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
