import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodPerimePage } from './food-perime.page';

const routes: Routes = [
  {
    path: '',
    component: FoodPerimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodPerimePageRoutingModule {}
