import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CONTENT_ROUTES ,USER_ROUTES} from './shared';
import { HomePageLayoutComponent } from './layouts/home-page-layout/home-page-layout.component';
import { UserPageLayoutComponent  } from './layouts/user-page-layout/user-page-layout.component';
// import { UserComponent } from './user/user.module';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  // {
  //   path: '',
  //   component: HomePageLayoutComponent,
  //   children: CONTENT_ROUTES
  // },
  // {
  //   path: '',
  //   component: UserPageLayoutComponent,
  //   children: USER_ROUTES
  // },
  {
      path: 'home',
      component: HomePageLayoutComponent,
      loadChildren: () => import('./main/main.module').then(m => m.MainModule),
      data: { preload: true}
    
  },
  {
    path: 'user',
    component: UserPageLayoutComponent,
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    data: { preload: true}
  },
  {
    path: 'signin',
    component: LoginComponent 
  },
  {
    path: 'signup',
    component: RegistrationComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
