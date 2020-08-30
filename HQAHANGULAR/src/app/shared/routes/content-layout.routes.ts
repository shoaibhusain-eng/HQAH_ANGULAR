import { Routes } from '@angular/router';
export const CONTENT_ROUTES: Routes = [
 
  // {
  //   path: 'auth',
  //   loadChildren: './modules/auth/auth.module#AuthModule'
  // },
  {
    path: 'home',
    loadChildren: () => import('../../main/main.module').then(m => m.MainModule),
    data: { preload: true}
  }
  // ,
  // {
  //   path: 'services',
  //   loadChildren: './modules/services/services.module#ServicesModule'
  // },
];
