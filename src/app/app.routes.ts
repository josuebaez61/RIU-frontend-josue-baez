import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    loadChildren: () => import('./pages').then((m) => m.routes),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];
