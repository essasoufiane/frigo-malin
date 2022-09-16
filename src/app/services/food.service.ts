import { Injectable } from '@angular/core';

import { Action, AngularFirestore, DocumentReference, DocumentSnapshot } from '@angular/fire/compat/firestore/';

import { from, Observable } from 'rxjs';

import { Food } from '../interfaces/food.interface';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private afs: AngularFirestore) { }

  allFoodByUser(userId: string) {
    const freezerCollectionRef = this.afs.collection<Food>('freezer', ref => ref.where('userId', '==', userId));
    return freezerCollectionRef.snapshotChanges();
  }
// récuperer un document (food) par son id
  getFood(id: string): Observable<Action<DocumentSnapshot<{}>>> {
    return this.afs.collection('freezer').doc(id).snapshotChanges();
  }

  addFood(foodItem: Food): Promise<DocumentReference> {
    return this.afs.collection('freezer').add(foodItem);
  }

  computeMaxDateToKeepFood(category, datePlacedInFreezer) {
    const securityMarginInDays = 7;
    const maxStayInFreezerInDays = category.maxStayInFreezerInMonth * 30;
    const maxStayInFreezerInDayswithMargin = maxStayInFreezerInDays - securityMarginInDays;
    const currentDate = new Date(datePlacedInFreezer);
    const finaleDate = currentDate.setDate(currentDate.getDate() + maxStayInFreezerInDayswithMargin);
    return new Date(finaleDate);
  }

  getFoodToEatBeforeDaysAgo(nbOfDays: number, userId: string): Observable<Food[]> {
    const daysInMilliseconds = nbOfDays * 24 * 3600 * 100;
    const dateInFuture = new Date(Date.now() + daysInMilliseconds);
    return this.afs.collection('freezer', ref => ref.where('betterToEatBefore', '<', dateInFuture).where('userId', '==' ,userId)).valueChanges() as Observable<Food[]>;
  }

  updateFood(food: Food): Observable<any> {
    return from(this.afs.doc(`freezer/${food.id}`).update(food))
  }

  deleteFood(id: string): Observable<any> {
    return from(this.afs.doc(`freezer/${id}`).delete());
  }
}
