import { Routes } from '@angular/router';
export const USER_ROUTES: Routes = [
  {
    path: 'user',
    loadChildren: () => import('../../user/user.module').then(m => m.UserModule),
    data: { preload: true}
  }
];