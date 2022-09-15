import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { Category } from "../interfaces/category.interface";
import categories from '../shared/food-categories';
import { Food } from "../interfaces/food.interface";
import { FoodService } from "../services/food.service";


@Component({
  selector: 'edit-modal',
  templateUrl: './edit-modal.html'
})

export class EditModal implements OnInit, OnDestroy {
  @Input() foodId: string;
  foodItem: any;
  sub: Subscription
  form: FormGroup
  allCategories: Category[];

  constructor(private foodService: FoodService, private modalCtrl: ModalController, private fb: FormBuilder, private toastCtrl: ToastController) {}

  ngOnInit() {
    this.allCategories = categories;
    this.sub = this.foodService.getFood(this.foodId).subscribe(data => {
      this.foodItem = {
        id: data.payload.id,
        foodName: (data.payload.data() as any).foodName,
        category: (data.payload.data() as any).category,
        datePlacedInFreezer: (typeof data.payload.get('datePlacedInFreezer') === 'object') ? new Date(data.payload.get('datePlacedInFreezer').toDate()).toISOString() : data.payload.get('datePlacedInFreezer'),
      } as Food;
      this.createForm();
      console.log('this.foodItem', this.foodItem);
    }, err => {
      console.error(err);
    })
  }

  createForm() {
    this.form = this.fb.group({
      foodName: new FormControl(this.foodItem.foodName, {
        validators: [Validators.required]
      }),
      category: new FormControl(this.foodItem.category, {
        validators: [Validators.required]
      }),
      datePlacedInFreezer: new FormControl(this.foodItem.datePlacedInFreezer, {
        validators: [Validators.required]
      }),
    })
  }

  update() {
    const updateFood = { ...this.form.value, id: this.foodItem.id };
    this.foodService.updateFood(updateFood).subscribe(async () => {
      const toast = await this.toastCtrl.create({
        message: 'Modification réussite !',
        duration: 2000,
        color: 'primary',
        position: 'top',
      });
      toast.present();
    })
  }

  goBack() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
