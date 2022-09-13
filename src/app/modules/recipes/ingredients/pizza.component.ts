import { AfterContentInit, Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

export interface Ingredient {
  name: string;
  value: string;
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
    }, Validators.required]
  });

  poolish: Ingredient[] = [
    {name: 'Mehl', value: '0'},
    {name: 'Wasser', value: '0'},
    {name: 'Hefe', value: '0'},
    {name: 'Honig', value: '0'}];

  dough: Ingredient[] = [
    {name: 'Mehl', value: '0'},
    {name: 'Wasser', value: '0'},
    {name: 'Salz', value: '0'}];

  constructor(private builder: FormBuilder) {
  }

  updateFields(): void {
    const count = this.ingredientsForm.controls['count'].value;

    const poolishFlour: Ingredient = this.poolish.find(ingredient => ingredient.name === 'Mehl')!;
    const poolishWater: Ingredient = this.poolish.find(ingredient => ingredient.name === 'Wasser')!;
    const poolishYeast: Ingredient = this.poolish.find(ingredient => ingredient.name === 'Hefe')!;
    const poolishHoney: Ingredient = this.poolish.find(ingredient => ingredient.name === 'Honig')!;
    const doughFlour: Ingredient = this.dough.find(ingredient => ingredient.name === 'Mehl')!;
    const doughWater: Ingredient = this.dough.find(ingredient => ingredient.name === 'Wasser')!;
    const doughSalt: Ingredient = this.dough.find(ingredient => ingredient.name === 'Salz')!;

    poolishFlour.value = String(count * 50) + 'g';
    poolishWater.value = String(count * 47.5) + 'g';
    poolishHoney.value = String(count * 0.5) + 'g';
    poolishYeast.value = String((count * 0.3).toFixed(1)) + 'g';
    doughFlour.value = String(count * 106) + 'g';
    doughWater.value = String(count * 62.5) + 'g';
    doughSalt.value = String(count * 4.5) + 'g';
  }

  ngAfterContentInit(): void {
    this.updateFields();
  }
}
