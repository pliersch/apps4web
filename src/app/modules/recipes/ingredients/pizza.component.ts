import { AfterContentInit, Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

export interface Ingredient {
  name: string;
  value: number;
}

export interface Poolish {
  flour: Ingredient;
  water: Ingredient;
  yeast: Ingredient;
  honey: Ingredient;
}

export interface Dough {
  flour: Ingredient;
  water: Ingredient;
  salt: Ingredient;
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

  poolish: Poolish = {
    flour: {name: 'Mehl', value: 0},
    water: {name: 'Wasser', value: 0},
    yeast: {name: 'Frischhefe', value: 0},
    honey: {name: 'Honig', value: 0},
  }

  dough: Dough = {
    flour: {name: 'Mehl', value: 0},
    water: {name: 'Wasser', value: 0},
    salt: {name: 'Salz', value: 0},
  }

  constructor(private builder: FormBuilder) {
  }

  updateFields(): void {
    Object.entries(this.poolish).forEach(([key, value]) => console.log(`${key}: ${value}`))
    const salt = 0.018;
    let controls = this.ingredientsForm.controls;
    let count = controls['count'].value;
    let hydration = controls['hydration'].value / 100;
    this.poolish.flour.value = count * 50;
    this.poolish.water.value = count * 50 * 0.95;
    this.poolish.yeast.value = count * hydration * 50;
    this.poolish.honey.value = count * hydration * 50;
  }

  ngAfterContentInit(): void {
    this.updateFields();
  }
}
