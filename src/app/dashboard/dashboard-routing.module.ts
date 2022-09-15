import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPage,
    children: [
      {
        path: 'profil',
        loadChildren: () => import('../profil/profil.module').then(m => m.ProfilPageModule)
      },
      {
        path: 'food-list',
        loadChildren: () => import('../food-list/food-list.module').then(m => m.FoodListPageModule)
      },
      {
        path: 'food-perime',
        loadChildren: () => import('../food-perime/food-perime.module').then(m => m.FoodPerimePageModule)
      },
      {
        path: 'add-food',
        loadChildren: () => import('../add-food/add-food.module').then(m => m.AddFoodPageModule)
      },
      {
        path: '',
        redirectTo: '/dashboard/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
