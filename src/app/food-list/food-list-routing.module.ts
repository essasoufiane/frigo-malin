import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodListPage } from './food-list.page';

const routes: Routes = [
  {
    path: '',
    component: FoodListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodListPageRoutingModule {}
