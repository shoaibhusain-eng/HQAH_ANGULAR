import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/core';
import { ViewComponent } from './view/view.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/hrms/services/view', pathMatch: 'full' },
      {
        path: 'view', component: ViewComponent,
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
