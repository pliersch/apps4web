import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from "@angular/material/slider";


import { PizzaComponent } from './pizza/pizza.component';
import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
    exports: [
        PizzaComponent
    ],
    imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    MatSliderModule,
    PizzaComponent
]
})
export class RecipesModule {}
