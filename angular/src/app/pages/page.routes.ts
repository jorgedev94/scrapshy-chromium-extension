import { Routes } from '@angular/router';
import { PageComponent } from './page.component';
import { PolicyComponent } from './policy/policy.component';
import { TestComponent } from './test/test.component';

export const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: PolicyComponent,
      },
      {
        path: 'test',
        component: TestComponent,
      },
    ],
  },
];
