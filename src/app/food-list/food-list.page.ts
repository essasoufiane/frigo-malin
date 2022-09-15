import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Food } from '../interfaces/food.interface';
import { FoodService } from '../services/food.service';
import { EditModal } from './edit-modal';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.page.html',
  styleUrls: ['./food-list.page.scss'],
})
export class FoodListPage implements OnInit, OnDestroy {

  allFoodInFreezer = [];
  sub: Subscription;
  userId: string;

  constructor(private foodService: FoodService, private modalCtrl: ModalController, private alertCtrl: AlertController, public afAuth: AngularFireAuth) { }

  isLoading = false;

  ngOnInit() {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        // console.log('non connecté');
      } else {
        this.userId = auth.uid;
        // console.log('connecté: ' + this.userId);
      };
      this.sub = this.foodService.allFoodByUser(this.userId).subscribe(data => { //s'abonner à l'observable
        this.allFoodInFreezer = data.map(e => {
          const foodItem = {
            id: e.payload.doc.id,
            foodName: (e.payload.doc.data() as any).foodName,
            category: (e.payload.doc.data() as any).category,
            datePlacedInFreezer: (typeof e.payload.doc.get('datePlacedInFreezer') === 'object') ? e.payload.doc.get('datePlacedInFreezer').toDate() : e.payload.doc.get('datePlacedInFreezer'),
          } as Food;
          // console.log('foodItem', foodItem);
          return foodItem;
        })
      }, err => { })
      // console.log('ngOnInit', this.allFoodInFreezer);
    });
  }

  async edit(id) {
    console.log('id', id);
    const modal = await this.modalCtrl.create({
      component: EditModal,
      componentProps: { 'foodId': id }
    });
    return await modal.present();
  }

  async delete(id) {
    console.log('id', id);
    this.isLoading = true;

    const alert = await this.alertCtrl.create({
      header: 'êtes-vous sur de vouloir supprimer ?',
      subHeader: 'cette action est irreversible',
      buttons: [
        {
          text: 'Annuler',
          cssClass: 'primary',
          role: 'cancel',
          handler: () => {
            this.isLoading = false;
          }
        },
        {
          text: 'Supprimer',
          cssClass: 'danger',
          handler: () => {
            this.foodService.deleteFood(id).pipe(
              take(1)
            ).subscribe(data => {
              this.isLoading = false;
            }, err => {
              this.isLoading = false;
              console.error(err)
            })

          }
        }
      ]
    })
    await alert.present();
  }

  ngOnDestroy() {
    this.sub.unsubscribe(); //desabonner de l'observable
  }

}
