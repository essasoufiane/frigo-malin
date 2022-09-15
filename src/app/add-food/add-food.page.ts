import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../interfaces/category.interface';
import { FoodService } from '../services/food.service';
import categories from '../shared/food-categories';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.page.html',
  styleUrls: ['./add-food.page.scss'],
})
export class AddFoodPage implements OnInit {

  form: FormGroup;
  isLoading = false;
  allCategories: Category[] = [];
  userId: string;

  constructor(private foodService: FoodService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.allCategories = categories;
    this.form = new FormGroup({
      foodName: new FormControl(null, {
        validators: [Validators.required]
      }),
      category: new FormControl({
        validators: [Validators.required]
      }),
      datePlacedInFreezer: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non connecté');
      } else {
        console.log('connecté: ' + auth.uid);
      };
      this.userId = auth.uid;
    });
  }

  add() {
    this.isLoading = true;
    const category = this.allCategories.find(c => c.id === this.form.value.category);
    const maxDateInFreezer = this.foodService.computeMaxDateToKeepFood(category, this.form.value.datePlacedInFreezer);

    const foodItem = {
      userId: this.userId,
      foodName: this.form.value.foodName,
      category:this.form.value.category,
      datePlacedInFreezer: new Date(this.form.value.datePlacedInFreezer),
      betterToEatBefore: maxDateInFreezer
    };
    this.foodService.addFood(foodItem)
    .then(data => {
      console.log('data', data);
      this.isLoading = false;
    })
    .catch(err => {
      console.error(err);
      this.isLoading = false;
    })
    this.form.reset(); //reset du formulaire après submit
  }

}
