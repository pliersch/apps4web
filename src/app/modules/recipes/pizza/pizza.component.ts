import { NgFor, NgTemplateOutlet } from '@angular/common';
import { AfterContentInit, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from "@angular/forms";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { MatTab, MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';

interface Recipe {
  yeast: number;
  flour: number;
  water: number;
  salt: number;
  min: number;
  max: number;
  step: number;
}

interface Ingredient {
  name: string;
  value: string;
}

@Component({
  selector: 'app-ingredients',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonToggleModule, ReactiveFormsModule, MatListModule, NgFor, MatSlider, FormsModule, MatSliderThumb, MatTab, MatTabGroup, NgTemplateOutlet]
})
export class PizzaComponent implements AfterContentInit {

  private recipes = new Map<string, Recipe>([
    ["Pizza", {min: 60, max: 80, step: 5, water: 65, yeast: 0.35, flour: 105, salt: 4.5}],
    ["Landbrot", {min: 80, max: 160, step: 10, water: 65, yeast: 0.3, flour: 107, salt: 4.0}],
  ]);

  recipe: Recipe;

  base = 50;
  fluorPoolish = 50;

  countControl = new UntypedFormControl('4');

  poolish: Ingredient[] = [
    {name: 'Mehl', value: '0'},
    {name: 'Wasser', value: '0'},
    {name: 'Hefe', value: '0'}];

  dough: Ingredient[] = [
    {name: 'Mehl', value: '0'},
    {name: 'Wasser', value: '0'},
    {name: 'Salz', value: '0'}];

  updateFields(): void {
    const factor = this.fluorPoolish / this.base;
    const count = this.countControl.value;

    const poolishFlour: Ingredient = this.poolish.find(ingredient => ingredient.name === 'Mehl')!;
    const poolishWater: Ingredient = this.poolish.find(ingredient => ingredient.name === 'Wasser')!;
    const poolishYeast: Ingredient = this.poolish.find(ingredient => ingredient.name === 'Hefe')!;
    const doughFlour: Ingredient = this.dough.find(ingredient => ingredient.name === 'Mehl')!;
    const doughWater: Ingredient = this.dough.find(ingredient => ingredient.name === 'Wasser')!;
    const doughSalt: Ingredient = this.dough.find(ingredient => ingredient.name === 'Salz')!;

    poolishFlour.value = this.toString(count * this.fluorPoolish);
    poolishWater.value = this.toString(count * this.fluorPoolish);
    poolishYeast.value = this.toString(count * this.recipe.yeast * factor);
    doughFlour.value = this.toString(count * this.recipe.flour * factor);
    doughWater.value = this.toString(count * this.recipe.water * factor);
    doughSalt.value = this.toString(count * this.recipe.salt * factor);
  }

  ngAfterContentInit(): void {
    this.recipe = this.recipes.get('Pizza')!;
    this.updateFields();
  }

  private toString(num: number): string {
    if (num % 1 === 0) {
      return String(num) + 'g';
    }
    return String(num.toFixed(1)) + 'g';
  }

  onSelectRecipe($event: MatTabChangeEvent): void {
    this.recipe = this.recipes.get($event.tab.textLabel)!;
    this.updateFields();
  }
}
