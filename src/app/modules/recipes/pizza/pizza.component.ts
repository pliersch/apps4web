import { NgFor } from '@angular/common';
import { AfterContentInit, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from "@angular/forms";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

export interface Ingredient {
  name: string;
  value: string;
}

@Component({
  selector: 'app-ingredients',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonToggleModule, ReactiveFormsModule, MatListModule, NgFor, MatSlider, FormsModule, MatSliderThumb, MatTab, MatTabGroup]
})
export class PizzaComponent implements AfterContentInit {

  fluorPoolish = 50;
  base = 50;
  value = 50;

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
    const factor = this.value / this.base;
    const count = this.countControl.value;

    const poolishFlour: Ingredient = this.poolish.find(ingredient => ingredient.name === 'Mehl')!;
    const poolishWater: Ingredient = this.poolish.find(ingredient => ingredient.name === 'Wasser')!;
    const poolishYeast: Ingredient = this.poolish.find(ingredient => ingredient.name === 'Hefe')!;
    const doughFlour: Ingredient = this.dough.find(ingredient => ingredient.name === 'Mehl')!;
    const doughWater: Ingredient = this.dough.find(ingredient => ingredient.name === 'Wasser')!;
    const doughSalt: Ingredient = this.dough.find(ingredient => ingredient.name === 'Salz')!;

    poolishFlour.value = this.toString(count * this.value);
    poolishWater.value = this.toString(count * this.value);
    poolishYeast.value = this.toString(count * 0.35 * factor);
    doughFlour.value = this.toString(count * 105 * factor);
    doughWater.value = this.toString(count * 65 * factor);
    doughSalt.value = this.toString(count * 4.5 * factor);
  }

  ngAfterContentInit(): void {
    this.updateFields();
  }

  private toString(num: number): string {
    if (num % 1 === 0) {
      return String(num) + 'g';
    }
    return String(num.toFixed(1)) + 'g';
  }
}
