import { Routes } from '@angular/router'
import { SidePanelComponent } from './side-panel.component'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./side-panel.component').then((m) => m.SidePanelComponent),
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
