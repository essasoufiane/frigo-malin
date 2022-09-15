import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { IonicModule } from '@ionic/angular';

import { FoodListPageRoutingModule } from './food-list-routing.module';

import { FoodListPage } from './food-list.page';
import { EditModal } from './edit-modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodListPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
  ],
  declarations: [FoodListPage, EditModal],
  entryComponents: [EditModal]
})
export class FoodListPageModule {}
