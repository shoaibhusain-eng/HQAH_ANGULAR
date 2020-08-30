import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  // START LEAD DEVELOPMENT
  {
    path: '', redirectTo: '/auth/login', pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./main/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'hrms',
    loadChildren: () => import('./main/hrms/hrms.module').then(m => m.HrmsModule)
  },
  {
    path: 'cms',
    loadChildren: () => import('./main/cms/cms.module').then(m => m.CmsModule)
  },
  {
    path: 'lms',
    loadChildren: () => import('./main/lms/lms.module').then(m => m.LmsModule)
  },

  // END LEAD DEVELOPMENT
  {
    path: 'apps',
    loadChildren: () => import('./main/apps/apps.module').then(m => m.AppsModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'ui',
    loadChildren: () => import('./main/ui/ui.module').then(m => m.UIModule)
  },
  {
    path: 'documentation',
    loadChildren: () => import('./main/documentation/documentation.module').then(m => m.DocumentationModule)
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
