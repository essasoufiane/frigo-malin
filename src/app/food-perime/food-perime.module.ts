import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodPerimePageRoutingModule } from './food-perime-routing.module';

import { FoodPerimePage } from './food-perime.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodPerimePageRoutingModule
  ],
  declarations: [FoodPerimePage]
})
export class FoodPerimePageModule {}
