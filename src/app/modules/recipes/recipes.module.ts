import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';
import { PizzaComponent } from './ingredients/pizza.component';
import { MaterialModule } from "@app/modules/share/material/material.module";
import { ShareModule } from "@modules/share/share.module";

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
    ShareModule
  ]
})
export class RecipesModule {}
