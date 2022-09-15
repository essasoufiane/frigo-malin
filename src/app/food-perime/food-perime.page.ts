import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
import { Food } from '../interfaces/food.interface';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-food-perime',
  templateUrl: './food-perime.page.html',
  styleUrls: ['./food-perime.page.scss'],
})
export class FoodPerimePage implements OnInit, OnDestroy {

  allFoodToEatSoon: Food[];
  sub: Subscription;
  nbOfDaysAgo = 15;//nmbr de jours restant avant de le mettre dans la liste
  userIdCo: string;

  constructor(private foodService: FoodService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.getFoodToEatBeforeDaysAgo();
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        // console.log('non connecté');
      } else {
        return this.userIdCo = auth.uid;
        // console.log('connecté: ' + this.userId);
      };
    });
  }

  getFoodToEatBeforeDaysAgo() {
    this.sub = this.foodService.getFoodToEatBeforeDaysAgo(this.nbOfDaysAgo).subscribe(data => {
      this.allFoodToEatSoon = data.map(foodItem => {
        return {
          betterToEatBefore: (foodItem.betterToEatBefore as any).toDate(),
          foodName: foodItem.foodName,
          datePlacedInFreezer: (foodItem.datePlacedInFreezer as any).toDate(),
          category: foodItem.category,
          userId: foodItem.userId,
        };
      });
    });
  }

  ionViewWillEnter() { //ionViewWillEnter s'execute a chaque fois qu'on vas dans la page contrairement a ngOnInit qui s'execute qu'a la création de la page
    this.getFoodToEatBeforeDaysAgo();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
