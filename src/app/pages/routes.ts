import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./heros-page/heros-page').then((m) => m.HerosPage),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./hero-form-page/hero-form-page').then((m) => m.HeroFormPage),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./hero-form-page/hero-form-page').then((m) => m.HeroFormPage),
  },
];
