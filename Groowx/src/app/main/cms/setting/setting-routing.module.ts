import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/core';
import { ListTmpComponent } from './template/list-tmp/list-tmp.component';
import { EditTmpComponent } from './template/edit-tmp/edit-tmp.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/cms/setting/template-list', pathMatch: 'full' },
      {
        path: 'template-list', component: ListTmpComponent,
      },
      {
        path: 'template-edit', component: EditTmpComponent,
      }
    ],
    canActivate: [AuthGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
