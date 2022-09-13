import { AfterContentInit, Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

export interface Ingredient {
  name: string;
  value: number;
}

@Component({
  selector: 'app-ingredients',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements AfterContentInit {

  ingredientsForm = this.builder.group({
    count: [{
      value: 4,
      disabled: false,
    }, Validators.required],
    hydration: [{
      value: 70,
      disabled: false,
    }, Validators.required]
  });

  poolish: Ingredient[] = [
    {name: 'Mehl', value: 0},
    {name: 'Wasser', value: 0},
    {name: 'Frischhefe', value: 0},
    {name: 'Honig', value: 0}];

  dough: Ingredient[] = [
    {name: 'Mehl', value: 0},
    {name: 'Wasser', value: 0},
    {name: 'Salz', value: 0}];

  constructor(private builder: FormBuilder) {
  }

  updateFields(): void {
    const salt = 0.03;
    let controls = this.ingredientsForm.controls;
    let count = controls['count'].value;
    let hydration = controls['hydration'].value / 100;

    let poolishFlour: Ingredient = this.poolish.find(ingredient => ingredient.name === 'Mehl')!;
    let poolishWater: Ingredient = this.poolish.find(ingredient => ingredient.name === 'Wasser')!;
    let poolishYeast: Ingredient = this.poolish.find(ingredient => ingredient.name === 'Frischhefe')!;
    let poolishHoney: Ingredient = this.poolish.find(ingredient => ingredient.name === 'Honig')!;
    let doughFlour: Ingredient = this.dough.find(ingredient => ingredient.name === 'Mehl')!;
    let doughWater: Ingredient = this.dough.find(ingredient => ingredient.name === 'Wasser')!;
    let doughSalt: Ingredient = this.dough.find(ingredient => ingredient.name === 'Salz')!;

    poolishFlour.value = count * 50;
    poolishWater.value = count * 50 * hydration;
    poolishHoney.value = count * 50;
    poolishYeast.value = Number((count * 50 * hydration * 0.0085).toFixed(2));
    doughFlour.value = count * 106;
    doughWater.value = count * 62.5;
    doughSalt.value = Number(((doughFlour.value + poolishWater.value) * salt).toFixed(2));
  }

  ngAfterContentInit(): void {
    this.updateFields();
  }
}
