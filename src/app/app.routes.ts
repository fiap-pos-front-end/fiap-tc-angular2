import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/pages/category-list/category-list.component').then(
        (m) => m.CategoryListComponent
      ),
  },
];
