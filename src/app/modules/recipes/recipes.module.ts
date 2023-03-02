import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from "@angular/material/slider";
import { MaterialModule } from "@app/modules/share/material/material.module";
import { ShareModule } from "@modules/share/share.module";
import { PizzaComponent } from './pizza/pizza.component';
import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
  declarations: [
    PizzaComponent
  ],
  exports: [
    PizzaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    MaterialModule,
    ShareModule,
    MatSliderModule
  ]
})
export class RecipesModule {}
