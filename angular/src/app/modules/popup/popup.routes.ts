import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./popup.component').then((m) => m.PopupComponent),
    children: [
      {
        path: '',
        redirectTo: 'page',
        pathMatch: 'full',
      },
      {
        path: 'page',
        loadChildren: () =>
          import('../../pages/page.routes').then((m) => m.routes),
      },
    ],
  },
];
